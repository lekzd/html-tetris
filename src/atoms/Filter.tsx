import React, {PureComponent} from "react";
import {ContainerProperties, Container} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

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
    const filter = new PIXI.Filter(undefined, this.props.shader, {});

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
