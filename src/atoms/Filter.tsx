import React, {PureComponent} from "react";
import {ContainerProperties, Container} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import commonVertex from '../shaders/common.vert';
import {Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/internal/operators';
import {mainTimer$} from '../App';

interface IProps extends Partial<ContainerProperties> {
  shader: string;
}

interface IState {
  filters: PIXI.Filter[];
}

export class Filter extends PureComponent<IProps, IState> {

  private unmount$ = new Subject();
  private filter = new PIXI.Filter(commonVertex, this.props.shader, {time: 0});

  state = {
    filters: [],
  };

  componentWillMount() {
    this.setState({filters: [this.filter]});

    mainTimer$
      .pipe(takeUntil(this.unmount$))
      .subscribe(time => {
        this.filter.uniforms.time = time;
      });
  }

  componentWillReceiveProps({shader}: IProps) {
    this.filter = new PIXI.Filter(commonVertex, shader, {time: 0});

    this.setState({filters: [this.filter]});
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
