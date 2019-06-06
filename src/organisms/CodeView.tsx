import React from 'react';
import {Container} from 'react-pixi-fiber';
import {CodeLines} from "../molecules/CodeLines";
import {LineNumbers} from '../molecules/LineNumbers';
import {StyleContext} from "../entities/StyleContext";
import {CELL_HEIGHT, CELL_WIDTH, WIDTH} from "../constants";
import {SymbolType} from "../entities/SymbolType";
import {Rectangle} from "../atoms/Rectangle";
import {BeakWord} from "../molecules/BeakWorld";
import {Filter} from "../atoms/Filter";
import {TERMINAL_THEME} from "../colorStyles";
import {PlayersContext} from '../entities/PlayersContext';

interface IProps {
  lines: string[];
  linesHeight: number;
  leftOffset: number;
  topOffset: number;
  activeIndex: number;
}

export const CodeView: React.FC<IProps> = ({lines, leftOffset, topOffset, linesHeight, activeIndex}) => (
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
          activeIndex={activeIndex}
        />

        <Filter shader={style.finalShader}>
          <CodeLines
            linesHeight={linesHeight}
            lines={lines}
            leftOffset={leftOffset}
            topOffset={topOffset}
          />
        </Filter>

        <Rectangle
          x={0}
          y={0}
          width={WIDTH * CELL_WIDTH}
          height={CELL_HEIGHT}
          fill={style[SymbolType.HIGHLIGHT]}
        />

        <BeakWord
          x={CELL_WIDTH * 4}
          y={0}
          fill={TERMINAL_THEME.accent}
          text={style.name}
        />

        <BeakWord
          x={-CELL_WIDTH}
          y={0}
          fill={style[SymbolType.HIGHLIGHT]}
          text={'vim'}
        />

        <Rectangle
          x={0}
          y={(linesHeight - 1) * CELL_HEIGHT}
          width={WIDTH * CELL_WIDTH}
          height={CELL_HEIGHT}
          fill={style[SymbolType.HIGHLIGHT]}
        />

        <PlayersContext.Consumer>
          {players => players.map(config => (
            <Container
              x={-CELL_WIDTH}
              y={(linesHeight - 1) * CELL_HEIGHT}
            >
              <BeakWord
                x={(config.name.length + 2) * CELL_WIDTH}
                y={0}
                fill={TERMINAL_THEME.accent}
                text={config.editorMode}
              />
              <BeakWord
                x={0}
                y={0}
                fill={config.color}
                text={config.name}
              />
            </Container>
          ))}
        </PlayersContext.Consumer>

      </Container>
    }
  </StyleContext.Consumer>
);
