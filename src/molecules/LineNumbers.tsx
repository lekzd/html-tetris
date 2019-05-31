import React, {Fragment, PureComponent} from "react";
import {Container} from "react-pixi-fiber";
import {CELL_HEIGHT, CELL_WIDTH, HEIGHT, NUMBERS_BG_COLOR, NUMBERS_COLOR} from "../constants";
import {Word} from '../atoms/Word';
import {Rectangle} from '../atoms/Rectangle';

interface IProps {
  lines: string[];
  leftOffset: number;
  topOffset: number;
}

export const LineNumbers: React.FC<IProps> = ({lines, leftOffset, topOffset}) => (
  <Container>
    <Rectangle
      x={0}
      y={0}
      width={leftOffset * CELL_WIDTH}
      height={HEIGHT * CELL_HEIGHT}
      fill={NUMBERS_BG_COLOR}
    />
    {
      lines.map((line, index) => (
        <Word
          key={index}
          x={0}
          y={(index + topOffset) * CELL_HEIGHT}
          text={index.toString().padStart(2, ' ')}
          fill={NUMBERS_COLOR}
        />
      ))
    }
  </Container>
);
