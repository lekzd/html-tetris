import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {CELL_HEIGHT, CELL_WIDTH, HEIGHT, WIDTH} from "../constants";
import {KeyBoardInput} from "../entities/KeyBoardInput";
import {Rectangle} from "../atoms/Rectangle";
import {IStyle, StyleContext} from "../entities/StyleContext";
import {COLOR_STYLES} from "../colorStyles";
import {SymbolType} from "../entities/SymbolType";
import {Word} from "../atoms/Word";
import {ChooseStyleSelect} from "../organisms/ChooseStyleSelect";
import {CodeLines} from "../molecules/CodeLines";
import {ChooseSpacesSelect} from "../organisms/ChooseSpacesSelect";

interface IProps {}

interface IState {
  style: IStyle;
  focusedElement: number;
  lines: string[];
}

type StyleName = keyof typeof COLOR_STYLES;

export class ChooseRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private keyBoardInput$ = new KeyBoardInput();
  private styleInput$ = this.keyBoardInput$.asObservable();

  state = {
    style: COLOR_STYLES.Monokai,
    focusedElement: 0,
    lines: [
      '<body>',
      ' <img src="src" alt="a11y" />',
      '</body>'
    ]
  };

  onStyleChange = (style: IStyle) => {
    this.setState({style});
  };

  onSpacesChange = (spaces: number) => {
    // this.setState({style});
  };

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

          <Rectangle
            x={9 * CELL_WIDTH}
            y={9 * CELL_HEIGHT}
            width={29 * CELL_WIDTH}
            height={5 * CELL_HEIGHT}
            fill={this.state.style[SymbolType.HIGHLIGHT]}
          />

          <Container x={10 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
            <ChooseStyleSelect onChange={this.onStyleChange} input$={this.styleInput$}/>
          </Container>

          <Container x={40 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
            <ChooseSpacesSelect onChange={this.onSpacesChange} input$={this.styleInput$}/>
          </Container>

          <Rectangle
            x={0}
            y={0}
            width={WIDTH * CELL_WIDTH}
            height={5 * CELL_HEIGHT}
            fill={this.state.style[SymbolType.BACKGROUND]}
          />

          <Rectangle
            x={0}
            y={5 * CELL_HEIGHT}
            width={WIDTH * CELL_WIDTH}
            height={CELL_HEIGHT}
            fill={this.state.style[SymbolType.HIGHLIGHT]}
          />

          <CodeLines
            lines={this.state.lines}
            leftOffset={2}
            topOffset={2}
          />

        </Container>
      </StyleContext.Provider>
    );
  }
}
