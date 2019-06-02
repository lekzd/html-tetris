import React, {PureComponent} from "react";
import {CELL_HEIGHT, CELL_WIDTH} from "../constants";
import {Container, ContainerProperties} from "react-pixi-fiber";
import {Beak} from "../atoms/Beak";
import {Word} from "../atoms/Word";
import {color} from "../utils/color";

interface IProps extends ContainerProperties {
  text: string;
  fill: number;
}

interface IState {
  width: number;
}

export class BeakWord extends PureComponent<IProps, IState> {

  state = {
    width: 0,
  };

  private setWidthToState(text: string) {
    this.setState({
      width: (text.length + 3) * CELL_WIDTH,
    });
  }

  componentWillMount() {
    this.setWidthToState(this.props.text);
  }

  componentWillReceiveProps({text}: IProps) {
    this.setWidthToState(text);
  }

  render() {
    return (
      <Container {...this.props}>
        <Beak
          x={0}
          y={0}
          height={CELL_HEIGHT}
          width={this.state.width}
          fill={this.props.fill}
        />
        <Word
          x={CELL_WIDTH * 2}
          y={0}
          text={this.props.text}
          fill={color('#FFFFFF')}
        />
      </Container>
    )
  }
}
