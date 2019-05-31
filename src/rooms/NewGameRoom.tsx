import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Dom} from "../entities/Dom";
import {CodeLines} from "../molecules/CodeLines";
import {CELL_HEIGHT, CELL_WIDTH, HEIGHT, HIGHLIGHT_COLOR, WIDTH} from "../constants";
import {Player} from "../molecules/PLayer";
import {KeyBoardInput} from "../entities/KeyBoardInput";
import {Rectangle} from "../atoms/Rectangle";
import {LineNumbers} from '../molecules/LineNumbers';

interface IProps {}

interface IState {
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
    lines: [],
    affectedLines: [],
    leftOffset: 0,
    topOffset: 0,
  };

  componentWillMount() {

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
      <Container>
        <Player
          dom={this.dom}
          input$={this.keyBoardInput$}
        />

        {
          this.state.affectedLines.map(index => (
            <Rectangle
              key={index}
              x={0}
              y={(index + this.state.topOffset) * CELL_HEIGHT}
              width={WIDTH * CELL_WIDTH}
              height={CELL_HEIGHT}
              fill={HIGHLIGHT_COLOR}
            />
          ))
        }

        <LineNumbers
          lines={this.state.lines}
          leftOffset={this.state.leftOffset}
          topOffset={this.state.topOffset}
        />

        <CodeLines
          lines={this.state.lines}
          leftOffset={this.state.leftOffset}
          topOffset={this.state.topOffset}
        />
      </Container>
    );
  }
}
