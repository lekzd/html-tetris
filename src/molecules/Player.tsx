import React, {PureComponent} from "react";
import {Command} from "../constants";
import {Dom} from "../entities/Dom";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {setPlayerState$} from '../App';
import {EditorMode} from '../entities/PlayersContext';
import {Stack} from '../utils/Stack';
import {InsertPlayer} from './InsertPlayer';
import {filter} from 'rxjs/internal/operators';
import {VisualPlayer} from './VisualPlayer';
import {NormalPlayer} from './NormalPlayer';

interface IProps {
  dom: Dom;
  id: string;
  name: string;
  mode: EditorMode;
  firstElement: string;
  input$: Observable<Command>;
}

interface IState {
}

const EDITOR_MODES_RING = [
  EditorMode.NORMAL,
  EditorMode.VISUAL,
  EditorMode.NORMAL,
  EditorMode.INSERT,
];

export class Player extends PureComponent<IProps, IState> {

  private dom = new Dom();
  private unmount$ = new Subject();
  private modesStack = new Stack(EDITOR_MODES_RING);

  state = {};

  componentWillMount() {
    this.props.input$
      .pipe(
        takeUntil(this.unmount$),
        filter(command => command === Command.ACTION)
      )
      .subscribe(() => {
        setPlayerState$.next({
          editorMode: this.modesStack.next(),
        });
    });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    switch (this.props.mode) {
      case EditorMode.INSERT:
        return (
          <InsertPlayer
            dom={this.props.dom}
            input$={this.props.input$}
            firstElement={this.props.firstElement}
          />
        );

      case EditorMode.VISUAL:
        return (
          <VisualPlayer
            dom={this.props.dom}
            input$={this.props.input$}
          />
        );

      case EditorMode.NORMAL:
        return (
          <NormalPlayer
            dom={this.props.dom}
            input$={this.props.input$}
          />
        );
    }
  }
}
