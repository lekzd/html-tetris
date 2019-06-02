import React, {PureComponent} from "react";
import {ContainerProperties, Container} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import commonVertex from '../shaders/common.vert';

interface IProps extends Partial<ContainerProperties> {
  shader: string;
}

interface IState {
  filters: PIXI.Filter[];
}

export class Filter extends PureComponent<IProps, IState> {

  state = {
    filters: [],
  };

  componentWillMount() {
    const filter = new PIXI.Filter(commonVertex, this.props.shader, {});

    this.setState({filters: [filter]})
  }

  componentWillReceiveProps({shader}: IProps) {
    const filter = new PIXI.Filter(commonVertex, shader, {});

    this.setState({filters: [filter]})
  }

  render() {
    return (
      <Container {...this.props} filters={this.state.filters}>
        {this.props.children}
      </Container>
    )
  }
}
