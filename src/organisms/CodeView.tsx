import React from 'react';
import {Container} from 'react-pixi-fiber';
import {CodeLines} from "../molecules/CodeLines";
import {LineNumbers} from '../molecules/LineNumbers';
import {StyleContext} from "../entities/StyleContext";
import {CELL_HEIGHT, CELL_WIDTH, WIDTH} from "../constants";
import {SymbolType} from "../entities/SymbolType";
import {Rectangle} from "../atoms/Rectangle";
import {color} from "../utils/color";
import {Word} from "../atoms/Word";

interface IProps {
  lines: string[];
  linesHeight: number;
  leftOffset: number;
  topOffset: number;
}

export const CodeView: React.FC<IProps> = ({lines, leftOffset, topOffset, linesHeight}) => (
  <StyleContext.Consumer>
    {style =>
      <Container>
        <Rectangle
          x={0}
          y={0}
          width={WIDTH * CELL_WIDTH}
          height={linesHeight * CELL_HEIGHT}
          fill={style[SymbolType.BACKGROUND]}
        />

        <LineNumbers
          linesHeight={linesHeight}
          lines={lines}
          leftOffset={leftOffset}
          topOffset={topOffset}
        />

        <CodeLines
          linesHeight={linesHeight}
          lines={lines}
          leftOffset={leftOffset}
          topOffset={topOffset}
        />

        <Rectangle
          x={0}
          y={0}
          width={WIDTH * CELL_WIDTH}
          height={CELL_HEIGHT}
          fill={style[SymbolType.HIGHLIGHT]}
        />

        <Rectangle
          x={0}
          y={0}
          width={(`>>> ${style.name} `.length) * CELL_WIDTH}
          height={CELL_HEIGHT}
          fill={color('#cc427e')}
        />

        <Word
          x={0}
          y={0}
          fill={color('#ffffff')}
          text={`>>> ${style.name}`}
        />

        <Rectangle
          x={0}
          y={(linesHeight - 1) * CELL_HEIGHT}
          width={WIDTH * CELL_WIDTH}
          height={CELL_HEIGHT}
          fill={style[SymbolType.HIGHLIGHT]}
        />
      </Container>
    }
  </StyleContext.Consumer>
);