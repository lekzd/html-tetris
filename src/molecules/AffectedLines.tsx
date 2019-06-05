import React, {PureComponent} from "react";
import {CELL_HEIGHT, CELL_WIDTH, WIDTH} from "../constants";
import {SymbolType} from "../entities/SymbolType";
import {StyleContext} from "../entities/StyleContext";
import {Dom} from '../entities/Dom';
import {Rectangle} from '../atoms/Rectangle';
import {Word} from '../atoms/Word';
import {Filter} from '../atoms/Filter';

interface IProps {
  dom: Dom;
  leftOffset: number;
  topOffset: number;
  lines: number[];
}

interface IState {
  lines: string[];
}

export class AffectedLines extends PureComponent<IProps, IState> {

  state = {
    lines: [],
  };

  componentWillMount() {
    const {lines} = this.props;

    this.setLinesToState(lines);
  }

  componentWillReceiveProps({lines}: IProps) {
    this.setLinesToState(lines);
  }

  private setLinesToState(lines: number[]) {
    this.setState({
      lines: lines.map(index => this.props.dom.renderedLines[index]),
    });
  }

  render() {
    return (
      <StyleContext.Consumer>
        {style =>
          this.props.lines.map((number, index) => (
            <Filter
              key={index}
              x={this.props.leftOffset * CELL_WIDTH}
              y={(number + this.props.topOffset) * CELL_HEIGHT}
              shader={style.affectedShader}
            >
              <Rectangle
                x={0}
                y={0}
                width={WIDTH * CELL_WIDTH}
                height={CELL_HEIGHT}
                fill={style[SymbolType.HIGHLIGHT]}
              />
              <Word
                fill={style[SymbolType.UNKNOWN]}
                text={this.state.lines[index]}
              />
            </Filter>
          ))
        }
      </StyleContext.Consumer>
    )
  }
}
