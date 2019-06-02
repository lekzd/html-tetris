import React, {PureComponent} from 'react';
import {Observable, Subject} from "rxjs";
import {filter, takeUntil} from "rxjs/operators";
import {CELL_HEIGHT, CELL_WIDTH, Command} from "../constants";
import {TERMINAL_THEME} from "../colorStyles";
import {BeakWord} from "../molecules/BeakWorld";

interface IProps {
  input$: Observable<Command>;
  text: string;
  onActivate: () => void;
}

interface IState {}

export class Button extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();

  componentWillMount() {
    this.props.input$
      .pipe(
        takeUntil(this.unmount$),
        filter(command => Command.ACTION === command),
      )
      .subscribe(() => {
        this.props.onActivate()
      });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <BeakWord x={CELL_WIDTH} y={CELL_HEIGHT} text={this.props.text} fill={TERMINAL_THEME.accent}/>
    )
  }
}
