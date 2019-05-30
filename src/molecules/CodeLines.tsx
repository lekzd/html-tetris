import React, {Fragment, PureComponent} from "react";
import {Letter} from "../atoms/Letter";
import {CELL_HEIGHT, CELL_WIDTH, COLOR_MAP, HEIGHT, WIDTH} from "../constants";
import {SymbolType} from "../entities/SymbolType";
import {Grid} from "../utils/Grid";
import {parseHTMLStr} from "../utils/parseHTMLStr";

interface IProps {
  lines: string[];
  leftOffset: number;
  topOffset: number;
}

interface IState {
  lines: Grid<ICell>;
}

interface ITag {
  tag: string;
  properties: {[key: string]: string};
  children: ITag[];
  collapsed: boolean;
}

enum TagActionType {
  TAG,
  ATTR,
}

interface ICell {
  symbol: string;
  type: TagActionType;
  symbolType: SymbolType;
}

export class CodeLines extends PureComponent<IProps, IState> {

  state = {
    lines: new Grid<ICell>(Math.max(WIDTH, HEIGHT)),
  };

  private setLinesToState(lines: string[], leftOffset: number, topOffset: number) {
    const newLines = new Grid<ICell>(Math.max(WIDTH, HEIGHT));

    lines.forEach((line, top) => {
      parseHTMLStr(line, (symbolType, symbol, index) => {
        newLines.set(index + leftOffset, top + topOffset, {
          symbol,
          type: TagActionType.TAG,
          symbolType,
        });
      });
    });

    this.setState({
      lines: newLines,
    });
  }

  componentWillMount() {
    const {lines, leftOffset, topOffset} = this.props;

    this.setLinesToState(lines, leftOffset, topOffset);
  }

  componentWillReceiveProps({lines, leftOffset, topOffset}: IProps) {
    this.setLinesToState(lines, leftOffset, topOffset);
  }

  render() {
    return (
      <Fragment>
        {
          this.state.lines.map(({symbol, symbolType}, x, y) => (
            <Letter
              key={`${x}.${y}`}
              x={x * CELL_WIDTH}
              y={y * CELL_HEIGHT}
              color={COLOR_MAP[symbolType]}
              text={symbol}
            />
          ))
        }
      </Fragment>
    )
  }
}
