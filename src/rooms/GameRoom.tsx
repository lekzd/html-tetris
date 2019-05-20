import React, {PureComponent} from 'react';
import {Text, Container} from 'react-pixi-fiber';
import {color} from "../utils/color";
import {Grid} from "../utils/Grid";
import {fromEvent, merge, Subject, timer} from "rxjs";
import {filter, map, takeUntil} from "rxjs/operators";
import keycode from "keycode";

interface IProps {}

enum Command {
  LEFT,
  SHIFT_LEFT,
  TOP,
  SHIFT_TOP,
  RIGHT,
  SHIFT_RIGHT,
  BOTTOM,
  SHIFT_BOTTOM,
}

interface IState {
  lines: Grid<ICell>;
  leftState: Command;
  leftText: string;
  leftX: number;
  leftY: number;
}

interface ITag {
  tag: string;
  properties: {[key: string]: string};
  children: ITag[];
  collapsed: boolean;
}

enum TagActionType {
  TAG,
  ATTR,
}

enum SymbolType {
  CONST,
  TAG,
  ATTR,
  VALUE,
}

interface ICell {
  symbol: string;
  tag: ITag;
  type: TagActionType;
  symbolType: SymbolType;
}

const KeyCommandMap: {[key: string]: Command} = {
  w: Command.TOP,
  a: Command.LEFT,
  s: Command.BOTTOM,
  d: Command.RIGHT,
};

const KeyShiftCommandMap: {[key: string]: Command} = {
  w: Command.SHIFT_TOP,
  a: Command.SHIFT_LEFT,
  s: Command.SHIFT_BOTTOM,
  d: Command.SHIFT_RIGHT,
};

const CELL_HEIGHT = 25;
const CELL_WIDTH = 15;
const CENTER_ANCHOR = '0.5,0.5';
const RANDOM_TEXTS = [
  'div',
  'a',
  'b',
  'span',
  'table',
  'img',
];

export class GameRoom extends PureComponent<IProps, IState> {
  private input$ = new Subject<Command>();
  private unmount$ = new Subject();
  private dom: ITag = {
    tag: 'root',
    properties: {},
    children: [],
    collapsed: false,
  };

  state = {
    lines: new Grid<ICell>(30),
    leftText: 'attr',
    leftState: Command.BOTTOM,
    leftX: 0,
    leftY: 0,
  };

  private getTagLinesCount(tag: ITag): number {
    return tag.children
      .map(child => this.getTagLinesCount(child))
      .reduce((memo, current) => memo + current, 0)
      + (tag.collapsed ? 1 : 2);
  }

  private drawOpenTag(tag: ITag, left: number, top: number) {
    let str = `<${tag.tag}>`;

    if (Object.keys(tag.properties).length) {
      const propsStringified = Object.entries(tag.properties)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      str = `<${tag.tag} ${propsStringified}>`;
    }

    [...str].forEach((symbol, index) => {
      this.state.lines.set(left + index, top, {
        symbol,
        tag,
        type: TagActionType.TAG,
        symbolType: ['<', '/', '>'].includes(symbol) ? SymbolType.CONST : SymbolType.TAG,
      });
    });
  }

  private drawCloseTag(tag: ITag, left: number, top: number) {
    let str = `</${tag.tag}>`;

    [...str].forEach((symbol, index) => {
      this.state.lines.set(left + index, top, {
        symbol,
        tag,
        type: TagActionType.TAG,
        symbolType: ['<', '/', '>'].includes(symbol) ? SymbolType.CONST : SymbolType.TAG,
      });
    });
  }

  private drawTag(tag: ITag, left: number, top: number, openedTags: string[]) {
    openedTags.push(tag.tag);

    this.drawOpenTag(tag, left, top);

    const linesCount = this.getTagLinesCount(tag);

    tag.children.forEach(child => {
      this.drawTag(child, left + 1, top + 1, openedTags);
    });

    this.drawCloseTag(tag, left, top + linesCount);

    openedTags.pop();
  }

  componentWillMount() {
    let openedTags: string[] = [];
    let left = 1;
    let top = 4;

    this.drawTag(this.dom, left, top, openedTags);

    timer(0, 200)
      .pipe(takeUntil(this.unmount$))
      .subscribe(() => this.tick());

    const keypress$ = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        takeUntil(this.unmount$)
      );

    const keypressNoShift$ = keypress$
      .pipe(
        filter(e => !e.shiftKey),
        map(e => keycode(e)),
        filter(e => Object.keys(KeyCommandMap).includes(e)),
        map(e => KeyCommandMap[e])
      );

    const keypressShift$ = keypress$
      .pipe(
        filter(e => e.shiftKey),
        map(e => keycode(e)),
        filter(e => Object.keys(KeyShiftCommandMap).includes(e)),
        map(e => KeyShiftCommandMap[e])
      );

    merge(keypressShift$, keypressNoShift$).subscribe(command => {
      this.setState({leftState: command});
    })
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  private reSpawnLeft() {
    let {leftX, leftY, leftState, leftText} = this.state;

    leftX = 2;
    leftY = 0;
    leftState = Command.BOTTOM;
    leftText = RANDOM_TEXTS[Math.floor(Math.random() * RANDOM_TEXTS.length)];

    this.setState({leftX, leftY, leftState, leftText});
  }

  private tryVerticalMove(targetOffset: number) {
    let {leftX, leftY, leftState, leftText, lines} = this.state;

    let offset = targetOffset / Math.abs(targetOffset);

    if (targetOffset < 0) {
      while (!lines.has(leftX, leftY + offset)) {
        if (offset === targetOffset) {
          break;
        }
        offset--;
      }
    } else {
      while (!lines.has(leftX, leftY + offset)) {
        if (offset === targetOffset) {
          break;
        }
        offset++;
      }
    }

    leftY += offset;

    if (lines.has(leftX, leftY)) {
      // while (lines.get(++x, leftY) !== '>') {
      //   if (x > 30) {
      //     if (leftState === Command.TOP) {
      //       this.setState({leftState: Command.BOTTOM});
      //     }
      //
      //     if (leftState === Command.BOTTOM) {
      //       this.setState({leftState: Command.TOP});
      //     }
      //
      //     return;
      //   }
      // }

      const {tag} = lines.get(leftX, leftY);

      tag.properties[leftText] = '';

      this.drawTag(this.dom, 1, 4, []);

      this.reSpawnLeft();

      return;
    }

    if (leftY < 0 || leftY > 20 || leftX < 0 || leftX > 30) {
      this.reSpawnLeft();

      return;
    }

    this.setState({leftX, leftY, leftState, leftText});
  }

  private tryHorizontalMove(offset: number) {
    let {leftX, leftY, leftState, leftText, lines} = this.state;

    leftX += offset;

    if (leftY < 0 || leftY > 20 || leftX < 0 || leftX > 30) {
      this.reSpawnLeft();

      return;
    }

    this.setState({leftX, leftY, leftState, leftText});
  }

  private tick() {
    switch (this.state.leftState) {
      case Command.BOTTOM:
        this.tryVerticalMove(+1);
        break;

      case Command.SHIFT_BOTTOM:
        this.tryVerticalMove(+5);
        this.setState({leftState: Command.BOTTOM});
        break;

      case Command.TOP:
        this.tryVerticalMove(-1);
        break;

      case Command.SHIFT_TOP:
        this.tryVerticalMove(-5);
        this.setState({leftState: Command.TOP});
        break;

      case Command.LEFT:
        this.tryHorizontalMove(-1);
        break;

      case Command.SHIFT_LEFT:
        this.tryHorizontalMove(-5);
        this.setState({leftState: Command.LEFT});
        break;

      case Command.RIGHT:
        this.tryHorizontalMove(+1);
        break;

      case Command.SHIFT_RIGHT:
        this.tryHorizontalMove(+5);
        this.setState({leftState: Command.RIGHT});
        break;
    }
  }

  render() {
    return (
      <Container>
        {
          [...this.state.leftText].map((symbol, i) => (
            <Text
              key={i}
              x={(this.state.leftX + i) * CELL_WIDTH}
              y={this.state.leftY * CELL_HEIGHT}
              anchor={CENTER_ANCHOR}
              style={{fill: color('#FFFFFF')}}
              text={symbol}
            />
          ))
        }


        {
          this.state.lines.map(({symbol, symbolType}, x, y) => (
            <Text
              key={`${x}.${y}`}
              x={x * CELL_WIDTH}
              y={y * CELL_HEIGHT}
              anchor={CENTER_ANCHOR}
              style={{fill: symbolType === SymbolType.CONST ? color('#ff4e90') : color('#CCCCCC')}}
              text={symbol}
            />
          ))
        }
      </Container>
    );
  }
}
