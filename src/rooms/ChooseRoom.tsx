import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {merge, Subject} from "rxjs";
import {CELL_HEIGHT, CELL_WIDTH, Command} from "../constants";
import {KeyBoardInput} from "../entities/KeyBoardInput";
import {Rectangle} from "../atoms/Rectangle";
import {IStyle, StyleContext} from "../entities/StyleContext";
import {COLOR_STYLES, TERMINAL_THEME} from "../colorStyles";
import {ChooseStyleSelect} from "../organisms/ChooseStyleSelect";
import {ChooseSpacesSelect} from "../organisms/ChooseSpacesSelect";
import {CodeView} from "../organisms/CodeView";
import {takeUntil, filter, map} from "rxjs/operators";
import {Button} from "../organisms/Button";
import {router$} from "../routes";
import {NewGameRoom} from "./NewGameRoom";

interface IProps {
  name: string;
}

interface IState {
  style: IStyle;
  spaces: number;
  focusedElement: number;
  lines: string[];
}

export class ChooseRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private keyBoardInput$ = new KeyBoardInput();

  private leftInput$ = this.keyBoardInput$
    .pipe(
      takeUntil(this.unmount$),
      filter(command => [Command.LEFT, Command.SHIFT_LEFT].includes(command)),
      filter(() => this.state.focusedElement > 0),
      map(() => this.state.focusedElement - 1)
    );

  private rightInput$ = this.keyBoardInput$
    .pipe(
      takeUntil(this.unmount$),
      filter(command => [Command.RIGHT, Command.SHIFT_RIGHT].includes(command)),
      filter(() => this.state.focusedElement < 2),
      map(() => this.state.focusedElement + 1)
    );

  private styleInput$ = this.keyBoardInput$
    .pipe(
      filter(() => this.state.focusedElement === 0)
    );

  private spacesInput$ = this.keyBoardInput$
    .pipe(
      filter(() => this.state.focusedElement === 1)
    );

  private buttonInput$ = this.keyBoardInput$
    .pipe(
      filter(() => this.state.focusedElement === 2)
    );

  state = {
    style: COLOR_STYLES.Monokai,
    spaces: 1,
    focusedElement: 0,
    lines: [
      '<body>',
      ' <img src="src" alt="a11y" />',
      '</body>'
    ]
  };

  onButtonActivate = () => {
    const {style, spaces} = this.state;

    router$.next([NewGameRoom, {style, spaces}]);
  };

  onStyleChange = (style: IStyle) => {
    this.setState({style});
  };

  onSpacesChange = (spaces: number) => {
    this.setState({
      spaces,
      lines: [
        '<body>',
        `${[...Array(spaces)].fill(' ').join('')}<img src="src" alt="a11y" />`,
        '</body>'
      ]
    });
  };

  componentWillMount() {
    merge(this.leftInput$, this.rightInput$)
      .subscribe(focusedElement => {
        this.setState({focusedElement});
      });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <StyleContext.Provider value={this.state.style}>
        <Container>

          <Container x={5 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
            {this.state.focusedElement === 0 && <Rectangle
              x={-CELL_WIDTH}
              y={-CELL_HEIGHT}
              width={27 * CELL_WIDTH}
              height={5 * CELL_HEIGHT}
              fill={TERMINAL_THEME.foreground}
            />}
            <ChooseStyleSelect onChange={this.onStyleChange} input$={this.styleInput$}/>
          </Container>

          <Container x={35 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
            {this.state.focusedElement === 1 && <Rectangle
              x={-CELL_WIDTH}
              y={-CELL_HEIGHT}
              width={15 * CELL_WIDTH}
              height={5 * CELL_HEIGHT}
              fill={TERMINAL_THEME.foreground}
            />}
            <ChooseSpacesSelect onChange={this.onSpacesChange} input$={this.spacesInput$}/>
          </Container>

          <Container x={55 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
            {this.state.focusedElement === 2 && <Rectangle
              x={-CELL_WIDTH}
              y={-CELL_HEIGHT}
              width={10 * CELL_WIDTH}
              height={5 * CELL_HEIGHT}
              fill={TERMINAL_THEME.foreground}
            />}
            <Button
              text={'GO'}
              onActivate={this.onButtonActivate}
              input$={this.buttonInput$}
            />
          </Container>


          <CodeView
            lines={this.state.lines}
            leftOffset={3}
            topOffset={2}
            linesHeight={7}
            activeIndex={-1}
          />

        </Container>
      </StyleContext.Provider>
    );
  }
}
