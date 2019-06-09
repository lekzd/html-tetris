import React, {Fragment, PureComponent} from "react";
import {Command, gameScrollState$, HEIGHT, WIDTH} from "../constants";
import {Dom} from "../entities/Dom";
import {merge, Observable, Subject} from "rxjs";
import {filter, map, takeUntil} from 'rxjs/operators';

interface IProps {
  dom: Dom;
  input$: Observable<Command>;
}

interface IState {
}

export class NormalPlayer extends PureComponent<IProps, IState> {

  private dom = new Dom();
  private unmount$ = new Subject();

  private leftInput$ = this.props.input$
    .pipe(
      takeUntil(this.unmount$),
      filter(command => [Command.LEFT, Command.SHIFT_LEFT].includes(command)),
      filter(() => gameScrollState$.value.leftOffset < WIDTH),
      map(command => command === Command.SHIFT_LEFT ? 5 : 1),
      map(value => gameScrollState$.value.leftOffset + value)
    );

  private rightInput$ = this.props.input$
    .pipe(
      takeUntil(this.unmount$),
      filter(command => [Command.RIGHT, Command.SHIFT_RIGHT].includes(command)),
      filter(() => gameScrollState$.value.leftOffset > -WIDTH),
      map(command => command === Command.SHIFT_RIGHT ? 5 : 1),
      map(value => gameScrollState$.value.leftOffset - value)
    );

  private topInput$ = this.props.input$
    .pipe(
      takeUntil(this.unmount$),
      filter(command => [Command.TOP, Command.SHIFT_TOP].includes(command)),
      filter(() => gameScrollState$.value.topOffset < HEIGHT),
      map(command => command === Command.SHIFT_TOP ? 5 : 1),
      map(value => gameScrollState$.value.topOffset + value)
    );

  private bottomInput$ = this.props.input$
    .pipe(
      takeUntil(this.unmount$),
      filter(command => [Command.BOTTOM, Command.SHIFT_BOTTOM].includes(command)),
      filter(() => gameScrollState$.value.topOffset > -HEIGHT),
      map(command => command === Command.SHIFT_BOTTOM ? 5 : 1),
      map(value => gameScrollState$.value.topOffset - value)
    );

  state = {
  };

  componentWillMount() {
    this.dom = this.props.dom;

    merge(this.leftInput$, this.rightInput$)
      .subscribe(leftOffset => {
        const {topOffset} = gameScrollState$.value;

        gameScrollState$.next({leftOffset, topOffset})
      });

    merge(this.topInput$, this.bottomInput$)
      .subscribe(topOffset => {
        const {leftOffset} = gameScrollState$.value;

        gameScrollState$.next({leftOffset, topOffset})
      });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <Fragment />
    )
  }
}
