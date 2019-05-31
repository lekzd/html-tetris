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

interface IProps {}

interface IState {
  style: IStyle;
  focusedElement: number;
}

type StyleName = keyof typeof COLOR_STYLES;

export class ChooseRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private keyBoardInput$ = new KeyBoardInput();
  private styleInput$ = this.keyBoardInput$.asObservable();

  state = {
    style: COLOR_STYLES.Monokai,
    focusedElement: 0,
  };

  onStyleChange = (style: IStyle) => {
    this.setState({style});
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

          <Container x={10 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
            <Word x={CELL_WIDTH} y={CELL_HEIGHT} text={'Style:'} fill={this.state.style[SymbolType.TAG]}/>
            <Container x={10 * CELL_WIDTH}>
              <ChooseStyleSelect onChange={this.onStyleChange} input$={this.styleInput$}/>
            </Container>
          </Container>

        </Container>
      </StyleContext.Provider>
    );
  }
}
