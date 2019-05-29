import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {color} from "../utils/color";
import {Grid} from "../utils/Grid";
import {fromEvent, merge, Subject, timer} from "rxjs";
import {filter, map, takeUntil} from "rxjs/operators";
import keycode from "keycode";
import {Letter} from "../atoms/Letter";
import {SymbolType} from "../entities/SymbolType";
import {parseHTMLStr} from "../utils/parseHTMLStr";

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
  IDLE,
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

interface ICell {
  parent: ITag;
  symbol: string;
  tag: ITag;
  isClosed: boolean;
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

const HEIGHT = 32;
const WIDTH = 53;
const CELL_HEIGHT = 25;
const CELL_WIDTH = 15;

const COLOR_MAP = {
  [SymbolType.UNKNOWN]: color('#FFFFFF'),
  [SymbolType.CONST]: color('#adadad'),
  [SymbolType.TAG]: color('#df426d'),
  [SymbolType.VALUE]: color('#f0ff61'),
  [SymbolType.EQUAl]: color('#f8ff7d'),
  [SymbolType.ATTR]: color('#72ff56'),
};

const RANDOM_TAGS = [
  'div',
  'a',
  'b',
  'span',
  'table',
  'template',
  'svg',
  'path',
  'main',
  'nav',
  'ul',
  'li',
  'img',
];

const RANDOM_ATTRS = [
  'class',
  'title',
  'id',
  'href',
  'onclick',
  'name',
  'role',
];

const RANDOM_TEXTS = [
  ...RANDOM_TAGS,
  ...RANDOM_ATTRS,
];

export class GameRoom extends PureComponent<IProps, IState> {
  private input$ = new Subject<Command>();
  private unmount$ = new Subject();
  private dom: ITag = {
    tag: 'root',
    properties: {},
    children: [
      {
        tag: 'span',
        properties: {id: 'first', class: "second"},
        children: [
          {
            tag: 'img',
            properties: {},
            children: [],
            collapsed: true,
          }
        ],
        collapsed: false,
      },
      {
        tag: 'span',
        properties: {id: 'first'},
        children: [],
        collapsed: false,
      }
    ],
    collapsed: false,
  };

  state = {
    lines: new Grid<ICell>(Math.max(HEIGHT, WIDTH)),
    leftText: RANDOM_TAGS[Math.floor(Math.random() * RANDOM_TAGS.length)],
    leftState: Command.IDLE,
    leftX: 0,
    leftY: 0,
  };

  private getTagLinesCount(tag: ITag): number {
    return tag.children
      .map(child => this.getTagLinesCount(child))
      .reduce((memo, current) => memo + current, 0)
      + (tag.collapsed ? 1 : 2);
  }

  private drawOpenTag(tag: ITag, parent: ITag, left: number, top: number) {
    let str = `<${tag.tag}>`;

    if (Object.keys(tag.properties).length) {
      const propsStringified = Object.entries(tag.properties)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      str = `<${tag.tag} ${propsStringified}>`;
    }

    if (tag.collapsed) {
      str = `<${tag.tag}/>`;
    }

    for (let i = 0; i < WIDTH; i++) {
      this.state.lines.unset(i, top);
    }

    parseHTMLStr(str, (symbolType, symbol, index) => {
      this.state.lines.set(left + index, top, {
        parent,
        symbol,
        tag,
        isClosed: tag.collapsed,
        type: TagActionType.TAG,
        symbolType,
      });
    });
  }

  private drawCloseTag(tag: ITag, parent: ITag, left: number, top: number) {
    let str = `</${tag.tag}>`;

    for (let i = 0; i < WIDTH; i++) {
      this.state.lines.unset(i, top);
    }

    parseHTMLStr(str, (symbolType, symbol, index) => {
      this.state.lines.set(left + index, top, {
        symbol,
        parent,
        tag,
        isClosed: true,
        type: TagActionType.TAG,
        symbolType,
      });
    });
  }

  private drawTag(tag: ITag, parent: ITag, left: number, top: number, openedTags: string[]) {
    openedTags.push(tag.tag);

    this.drawOpenTag(tag, parent, left, top);

    let childTop = top + 1;
    tag.children.forEach(child => {
      this.drawTag(child, tag, left + 1, childTop, openedTags);
      childTop += this.getTagLinesCount(child);
    });

    if (!tag.collapsed) {
      this.drawCloseTag(tag, parent, left, childTop);
      openedTags.pop();
    }
  }

  componentWillMount() {
    const linesCount = this.getTagLinesCount(this.dom);
    let openedTags: string[] = [];
    let left = 1;
    let top = (HEIGHT - linesCount) >> 1;

    this.drawTag(this.dom, this.dom, left, top, openedTags);

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

  private getVerticalOffsetToCollide(x: number, y: number, targetOffset: number): number {
    let {lines} = this.state;
    let offset = targetOffset / Math.abs(targetOffset);

    if (targetOffset < 0) {
      while (!lines.has(x, y + offset)) {
        if (offset === targetOffset) {
          break;
        }
        offset--;
      }
    } else {
      while (!lines.has(x, y + offset)) {
        if (offset === targetOffset) {
          break;
        }
        offset++;
      }
    }

    return offset;
  }

  private getHorizontalOffsetToCollide(x: number, y: number, targetOffset: number): number {
    let {lines} = this.state;
    let offset = targetOffset / Math.abs(targetOffset);

    if (targetOffset < 0) {
      while (!lines.has(x + offset, y)) {
        if (offset === targetOffset) {
          break;
        }
        offset--;
      }
    } else {
      while (!lines.has(x + offset, y)) {
        if (offset === targetOffset) {
          break;
        }
        offset++;
      }
    }

    return offset;
  }

  private tryVerticalMove(targetOffset: number) {
    let {leftX, leftY, leftState, leftText, lines} = this.state;
    const offset = this.getVerticalOffsetToCollide(leftX, leftY, targetOffset);

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

      const linesCount = this.getTagLinesCount(this.dom);
      let openedTags: string[] = [];
      let left = 1;
      let top = (HEIGHT - linesCount) >> 1;

      this.drawTag(this.dom, this.dom, left, top, openedTags);

      this.reSpawnLeft();

      return;
    }

    if (leftY < 0 || leftY > HEIGHT || leftX < 0 || leftX > WIDTH) {
      this.reSpawnLeft();

      return;
    }

    this.setState({leftX, leftY, leftState, leftText});
  }

  private tryHorizontalMove(targetOffset: number) {
    let {leftX, leftY, leftState, leftText, lines} = this.state;
    const offset = this.getHorizontalOffsetToCollide(leftX, leftY, targetOffset);

    leftX += offset;

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

      const {tag, isClosed, parent} = lines.get(leftX, leftY);

      if (isClosed) {
        const index = parent.children.indexOf(tag);
        const newTag = {
          tag: leftText,
          properties: {},
          collapsed: false,
          children: [],
        };

        parent.children = [
          ...parent.children.slice(0, index + 1),
          newTag,
          ...parent.children.slice(index + 1),
        ];
      } else {
        tag.children.unshift({
          tag: leftText,
          properties: {},
          collapsed: false,
          children: [],
        });
      }

      const linesCount = this.getTagLinesCount(this.dom);
      let openedTags: string[] = [];
      let left = 1;
      let top = (HEIGHT - linesCount) >> 1;

      this.state.lines.clear();

      this.drawTag(this.dom, this.dom, left, top, openedTags);

      this.reSpawnLeft();

      return;
    }

    if (leftY < 0 || leftY > HEIGHT || leftX < 0 || leftX > WIDTH) {
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
            <Letter
              key={i}
              x={(this.state.leftX + i) * CELL_WIDTH}
              y={this.state.leftY * CELL_HEIGHT}
              color={color('#FFFFFF')}
              text={symbol}
            />
          ))
        }


        {
          this.state.lines.map(({symbol, symbolType}, x, y) => (
            <Letter
              key={`${x}.${y}`}
              x={x * CELL_WIDTH}
              y={y * CELL_HEIGHT}
              color={COLOR_MAP[symbolType]}
              text={symbol}
            />
          ))
        }
      </Container>
    );
  }
}
