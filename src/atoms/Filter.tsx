import React, {PureComponent} from "react";
import {ContainerProperties, Container} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import commonVertex from '../shaders/common.vert';
import {interval, Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/internal/operators';

interface IProps extends Partial<ContainerProperties> {
  shader: string;
}

interface IState {
  filters: PIXI.Filter[];
}

export class Filter extends PureComponent<IProps, IState> {

  private timer$ = interval(100);
  private unmount$ = new Subject();

  state = {
    filters: [],
  };

  componentWillMount() {
    const filter = new PIXI.Filter(commonVertex, this.props.shader, {time: 0});

    this.setState({filters: [filter]});

    this.timer$
      .pipe(takeUntil(this.unmount$))
      .subscribe(time => {
        filter.uniforms.time = time;
      });
  }

  componentWillReceiveProps({shader}: IProps) {
    const filter = new PIXI.Filter(commonVertex, shader, {});

    this.setState({filters: [filter]})
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <Container {...this.props} filters={this.state.filters}>
        {this.props.children}
      </Container>
    )
  }
}
