import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {CELL_HEIGHT, CELL_WIDTH} from "../constants";
import {KeyBoardInput} from "../entities/KeyBoardInput";
import {Rectangle} from "../atoms/Rectangle";
import {TERMINAL_THEME} from "../colorStyles";
import {takeUntil, filter} from "rxjs/operators";
import {Button} from "../organisms/Button";
import {router$} from "../routes";
import {ChooseRoom} from "./ChooseRoom";
import {QrRectangle} from "../atoms/QrRectangle";
import {color} from "../utils/color";

interface IProps {}

interface IState {
  focusedElement: number;
  joinLinks: string[];
}

export class JoinRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private keyBoardInput$ = new KeyBoardInput();

  // private leftInput$ = this.keyBoardInput$
  //   .pipe(
  //     takeUntil(this.unmount$),
  //     filter(command => [Command.LEFT, Command.SHIFT_LEFT].includes(command)),
  //     filter(() => this.state.focusedElement > 0),
  //     map(() => this.state.focusedElement - 1)
  //   );
  //
  // private rightInput$ = this.keyBoardInput$
  //   .pipe(
  //     takeUntil(this.unmount$),
  //     filter(command => [Command.RIGHT, Command.SHIFT_RIGHT].includes(command)),
  //     filter(() => this.state.focusedElement < 2),
  //     map(() => this.state.focusedElement + 1)
  //   );

  private buttonInput$ = this.keyBoardInput$
    .pipe(
      takeUntil(this.unmount$),
      filter(() => this.state.focusedElement === 0)
    );

  state = {
    focusedElement: 0,
    joinLinks: [],
  };

  onButtonActivate = () => {
    router$.next([ChooseRoom, {name: ''}]);
  };

  componentWillMount() {
    this.setState({
      joinLinks: ['http://localhost.hu/html-tetris/client/111111', 'http://localhost.hu/html-tetris/client/222222']
    });

    // merge(this.leftInput$, this.rightInput$)
    //   .subscribe(focusedElement => {
    //     this.setState({focusedElement});
    //   });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <Container>

        {this.state.joinLinks.map((link, index) => (
          <QrRectangle
            key={index}
            x={110}
            y={110 + index * 310}
            size={210}
            fill={color('#FFFFFF')}
            stroke={color('#000000')}
            string={link}
          />
        ))}

        <Container x={55 * CELL_WIDTH} y={10 * CELL_HEIGHT}>
          {this.state.focusedElement === 0 && <Rectangle
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

      </Container>
    );
  }
}
