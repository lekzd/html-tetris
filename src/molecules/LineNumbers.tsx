import React from "react";
import {Container} from "react-pixi-fiber";
import {CELL_HEIGHT, CELL_WIDTH, NUMBERS_COLOR} from "../constants";
import {Word} from '../atoms/Word';
import {Rectangle} from '../atoms/Rectangle';
import {StyleContext} from "../entities/StyleContext";
import {SymbolType} from "../entities/SymbolType";

interface IProps {
  lines: string[];
  leftOffset: number;
  topOffset: number;
  linesHeight: number;
}

export const LineNumbers: React.FC<IProps> = ({lines, leftOffset, topOffset, linesHeight}) => (

  <StyleContext.Consumer>
    {style =>
      <Container>
        <Rectangle
          x={0}
          y={0}
          width={leftOffset * CELL_WIDTH}
          height={linesHeight * CELL_HEIGHT}
          fill={style[SymbolType.NUMBERS_BG]}
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
    }
  </StyleContext.Consumer>
);
