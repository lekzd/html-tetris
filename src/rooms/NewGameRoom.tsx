import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Dom} from "../entities/Dom";
import {CELL_HEIGHT, CELL_WIDTH, HEIGHT, WIDTH} from "../constants";
import {Player} from "../molecules/PLayer";
import {KeyBoardInput} from "../entities/KeyBoardInput";
import {Rectangle} from "../atoms/Rectangle";
import {IStyle, StyleContext} from "../entities/StyleContext";
import {COLOR_STYLES} from "../colorStyles";
import {SymbolType} from "../entities/SymbolType";
import {CodeView} from "../organisms/CodeView";

interface IProps {}

interface IState {
  style: IStyle;
  lines: string[];
  affectedLines: number[];

  leftOffset: number;
  topOffset: number;
}

export class NewGameRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private keyBoardInput$ = new KeyBoardInput();
  private dom = new Dom();

  state = {
    style: COLOR_STYLES.Solarized,
    lines: [],
    affectedLines: [],
    leftOffset: 0,
    topOffset: 0,
  };

  getRandomStyle(): IStyle {
    const keys = Object.keys(COLOR_STYLES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof COLOR_STYLES;

    return COLOR_STYLES[randomKey];
  }

  componentWillMount() {

    setInterval(() => {
      this.setState({
        style: this.getRandomStyle()
      })
    }, 5000);

    this.dom.affectedLines$
      .pipe(
        takeUntil(this.unmount$)
      ).subscribe(lines => {

        this.setState({affectedLines: lines});

        setTimeout(() => {
          this.setState({affectedLines: []});
        }, 1000);

      });

    this.dom
      .pipe(
        takeUntil(this.unmount$)
      ).subscribe(lines => {
        const topOffset = (HEIGHT - lines.length) >> 1;
        const leftOffset = 3;

        this.setState({lines, leftOffset, topOffset});
      });

    this.dom.pushNode('body');
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <StyleContext.Provider value={this.state.style}>
        <Container>

          <Rectangle
            x={0}
            y={0}
            width={WIDTH * CELL_WIDTH}
            height={HEIGHT * CELL_HEIGHT}
            fill={this.state.style[SymbolType.BACKGROUND]}
          />

          <StyleContext.Consumer>
            {style =>
              this.state.affectedLines.map(index => (
                <Rectangle
                  key={index}
                  x={0}
                  y={(index + this.state.topOffset) * CELL_HEIGHT}
                  width={WIDTH * CELL_WIDTH}
                  height={CELL_HEIGHT}
                  fill={style[SymbolType.HIGHLIGHT]}
                />
              ))
            }
          </StyleContext.Consumer>

          <CodeView
            lines={this.state.lines}
            leftOffset={this.state.leftOffset}
            topOffset={this.state.topOffset}
            linesHeight={HEIGHT}
          />

          <Player
            dom={this.dom}
            input$={this.keyBoardInput$}
          />

        </Container>
      </StyleContext.Provider>
    );
  }
}
