import React, {PureComponent} from "react";
import {AppContext, ContainerProperties, Container} from 'react-pixi-fiber';
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
  static contextType = AppContext;

  private unmount$ = new Subject();
  private uniformGroup = new PIXI.UniformGroup({
    time: {
      type: 'float',
      value: 0,
    },
    resolution: {
      type: 'vec2',
      value: {
        x: 1200,
        y: 800,
      },
    }
  });
  private filter = new PIXI.Filter(commonVertex, this.props.shader, this.uniformGroup);

  state = {
    filters: [],
  };

  componentWillMount() {
    this.filter = new PIXI.Filter(commonVertex, this.props.shader, this.uniformGroup);
    this.setState({filters: [this.filter]});

    mainTimer$
      .pipe(takeUntil(this.unmount$))
      .subscribe(time => {
        this.uniformGroup.uniforms.time = time;

        this.uniformGroup.uniforms.resolution.x = 1200;
        this.uniformGroup.uniforms.resolution.y = 800;
      });
  }

  componentWillReceiveProps({shader}: IProps) {
    this.filter = new PIXI.Filter(commonVertex, shader, this.uniformGroup);

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
