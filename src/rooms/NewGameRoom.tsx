import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Dom} from "../entities/Dom";
import {CodeLines} from "../molecules/CodeLines";
import {HEIGHT} from "../constants";
import {Player} from "../molecules/PLayer";
import {KeyBoardInput} from "../entities/KeyBoardInput";

interface IProps {}

interface IState {
  lines: string[];

  leftOffset: number;
  topOffset: number;
}

export class NewGameRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private keyBoardInput$ = new KeyBoardInput();
  private dom = new Dom();

  state = {
    lines: [],
    leftOffset: 0,
    topOffset: 0,
  };

  componentWillMount() {

    this.dom
      .pipe(
        takeUntil(this.unmount$)
      ).subscribe(lines => {
        const topOffset = (HEIGHT - lines.length) >> 1;
        const leftOffset = 2;

        this.setState({lines, leftOffset, topOffset});
      });

    this.dom.pushNode('root');
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <Container>
        <Player dom={this.dom} input$={this.keyBoardInput$} />

        <CodeLines
          lines={this.state.lines}
          leftOffset={this.state.leftOffset}
          topOffset={this.state.topOffset}
        />
      </Container>
    );
  }
}
