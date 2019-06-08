import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {CELL_HEIGHT, CELL_WIDTH} from "../constants";
import {KeyBoardInput} from "../entities/KeyBoardInput";
import {Rectangle} from "../atoms/Rectangle";
import {JOIN_ROOM_THEME, TERMINAL_THEME} from "../colorStyles";
import {takeUntil, filter} from "rxjs/operators";
import {Button} from "../organisms/Button";
import {router$} from "../routes";
import {ChooseRoom} from "./ChooseRoom";
import {QrRectangle} from "../atoms/QrRectangle";
import {color} from "../utils/color";

import figlet from "figlet";
import {CodeView} from '../organisms/CodeView';
import {StyleContext} from '../entities/StyleContext';
import {Stack} from '../utils/Stack';

interface IProps {}

interface IState {
  focusedElement: number;
  joinLinks: string[];
  lines: string[];
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
    lines: [],
  };

  onButtonActivate = () => {
    router$.next([ChooseRoom, {name: ''}]);
  };

  componentWillMount() {
    this.setState({
      joinLinks: ['http://localhost.hu/html-tetris/client/111111', 'http://localhost.hu/html-tetris/client/222222']
    });

    let array: any[] = ([
      {
        command: 'Welcome to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'wElcome to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'weLcome to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welCome to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcOme to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcoMe to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcomE to vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcome To vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcome tO vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcome to Vim',
        descr: 'type :q to exit',
      },
      {
        command: 'welcome to vIm',
        descr: 'type :q to exit',
      },
      {
        command: 'welcome to viM',
        descr: 'type :q to exit',
      }
    ]);

    const tutorial: string[] = [
      ' :q  - to exit',
      ' :e  - to browse files',
      ' x   - to delete the unwanted character',
      ' u   - to undo the last the command and U to undo the whole line',
      ' A   - to append text at the end',
      ' :wq - to save and exit',
      ' :q! - to trash all changes',
      ' dd  - to delete the line',
      ' dw  - to delete word',
      ' d2w - which deletes 2 words',
      ' 2w  - to move the cursor two words forward.',
      ' 3e  - to move the cursor to the end of the third word forward.',
      ' 0   - to move to the start of the line.',
      ' i   - switch to INSERT mode',
      ' v   - switch to VISUAL mode',
      ' ESC - switch to NORMAL mode',
      ' gt  - switch to next tab',
      ' gT  - switch to previous tab',
    ];

    const welcomeStack = new Stack(array);
    const tutorialStack = new Stack(tutorial);

    setInterval(() => {
      const {command} = welcomeStack.next();

      tutorialStack.next();

      // @ts-ignore
      figlet(`${command}`, 'Standard', (err, data) => {
        this.setState({
          lines: [
            ...data.split(/\n/g),
            ' ',
            ...tutorialStack.slice(0, 8)
          ],
        })
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <StyleContext.Provider value={JOIN_ROOM_THEME}>

        <CodeView
          lines={this.state.lines}
          leftOffset={3}
          topOffset={2}
          linesHeight={19}
          activeIndex={-1}
        />

        {this.state.joinLinks.map((link, index) => (
          <QrRectangle
            key={index}
            x={110 + index * 310}
            y={560}
            size={210}
            fill={color('#FFFFFF')}
            stroke={color('#000000')}
            string={link}
          />
        ))}

        <Container x={55 * CELL_WIDTH} y={25 * CELL_HEIGHT}>
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

      </StyleContext.Provider>
    );
  }
}
