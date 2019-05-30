import React, {PureComponent} from "react";
import {Letter} from "./Letter";
import {CELL_WIDTH} from "../constants";
import {color} from "../utils/color";
import {Container, ContainerProperties} from "react-pixi-fiber";

interface IProps extends ContainerProperties {
  text: string;
  fill: number;
}

interface IState {
  symbols: string[];
}

export class Word extends PureComponent<IProps, IState> {

  state = {
    symbols: [],
  };

  private setLinesToState(text: string) {
    this.setState({
      symbols: [...text],
    });
  }

  componentWillMount() {
    this.setLinesToState(this.props.text);
  }

  componentWillReceiveProps({text}: IProps) {
    this.setLinesToState(text);
  }

  render() {
    return (
      <Container {...this.props}>
        {
          this.state.symbols.map((symbol, i) => (
            <Letter
              key={i}
              x={(i) * CELL_WIDTH}
              y={0}
              color={this.props.fill}
              text={symbol}
            />
          ))
        }
      </Container>
    )
  }
}
