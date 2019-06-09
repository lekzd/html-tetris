import React, {PureComponent} from "react";
import {Letter} from "../atoms/Letter";
import {CELL_HEIGHT, CELL_WIDTH, WIDTH} from "../constants";
import {Grid} from "../utils/Grid";
import {StyleContext} from "../entities/StyleContext";

interface IProps {
  link: string;
  linesHeight: number;
}

interface IState {
  lines: Grid<string>;
}

export class AsciiArt extends PureComponent<IProps, IState> {

  state = {
    lines: new Grid<string>(Math.max(WIDTH, this.props.linesHeight)),
  };

  private setLinesToState(lines: string[]) {
    const newLines = new Grid<string>(Math.max(WIDTH, this.props.linesHeight));

    const maxLineWidth = Math.max(...lines.map(l => l.length));
    const leftOffset = (WIDTH - maxLineWidth) >> 1;
    const topOffset = (this.props.linesHeight - lines.length) >> 1;
    const croppedLines = topOffset < 0
      ? lines.slice(0, this.props.linesHeight + Math.abs(topOffset) - 1)
      : lines.slice(0);

    croppedLines.forEach((line, top) => {
      line.split('').forEach((symbol, index) => {
        newLines.set(index + leftOffset, top + topOffset, symbol);
      });
    });

    this.setState({
      lines: newLines,
    });
  }

  private loadArt(link: string) {
    if (!link) {
      return;
    }

    fetch(link)
      .then(response => response.text())
      .then(text => this.setLinesToState(text.split(/\n/g)));
  }

  componentWillMount() {
    const {link} = this.props;

    this.loadArt(link);
  }

  componentWillReceiveProps({link}: IProps) {
    if (link !== this.props.link) {
      this.loadArt(link);
    }
  }

  render() {
    return (
      <StyleContext.Consumer>
        {style =>
          this.state.lines.map((symbol, x, y) => (
            <Letter
              key={`${x}.${y}`}
              x={x * CELL_WIDTH}
              y={y * CELL_HEIGHT}
              color={style.asciiColor}
              text={symbol}
            />
          ))
        }
      </StyleContext.Consumer>
    )
  }
}
