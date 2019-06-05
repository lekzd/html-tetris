import React from 'react';
import {NewGameRoom} from '../src/rooms/NewGameRoom';
import {StyleContext} from "../src/entities/StyleContext";
import {COLOR_STYLES} from "../src/colorStyles";
import {CodeView} from "../src/organisms/CodeView";
import {story} from "./utils";
import {ChooseRoom} from "../src/rooms/ChooseRoom";
import {JoinRoom} from "../src/rooms/JoinRoom";
import {SymbolType} from '../src/entities/SymbolType';
import {CELL_HEIGHT, CELL_WIDTH, WIDTH} from '../src/constants';
import {Rectangle} from '../src/atoms/Rectangle';
import {Word} from '../src/atoms/Word';
import {Filter} from '../src/atoms/Filter';

story('JoinRoom')
  .add('General', () => (
    <JoinRoom />
  ));

story('ChooseRoom')
  .add('General', () => (
    <ChooseRoom name={''} />
  ));

const gameRoomStory = story('NewGameRoom');

Object.keys(COLOR_STYLES).forEach(key => {
  gameRoomStory
    .add(key, () => (
      <NewGameRoom style={COLOR_STYLES[key]} spaces={4} />
    ));
});

const storiesModule = story('CodeView/Themes');
const codeLines = [
  '<body>',
  '  <div class="form-item">',
  '    <input name="formInput" value="" />',
  '  </div>',
  '</body>'
];

Object.keys(COLOR_STYLES).forEach(key => {
  storiesModule
    .add(`${key}`, () => (
      <StyleContext.Provider value={COLOR_STYLES[key]}>
        <CodeView
          lines={codeLines}
          leftOffset={3}
          topOffset={6}
          linesHeight={18}
          activeIndex={-1}
        />
      </StyleContext.Provider>
    ))
});

const storiesAffectedModule = story('CodeView/AffectedLines');

Object.keys(COLOR_STYLES).forEach(key => {
  storiesAffectedModule
    .add(`${key}`, () => (
      <StyleContext.Provider value={COLOR_STYLES[key]}>
        <CodeView
          lines={codeLines}
          leftOffset={3}
          topOffset={6}
          linesHeight={18}
          activeIndex={-1}
        />

        {[1, 3].map(index => (
          <Filter
            key={index}
            x={3 * CELL_WIDTH}
            y={(index + 6) * CELL_HEIGHT}
            shader={COLOR_STYLES[key].affectedShader}
          >
            <Rectangle
              x={0}
              y={0}
              width={WIDTH * CELL_WIDTH}
              height={CELL_HEIGHT}
              fill={COLOR_STYLES[key][SymbolType.HIGHLIGHT]}
            />
            <Word
              fill={COLOR_STYLES[key][SymbolType.UNKNOWN]}
              text={codeLines[index]}
            />
          </Filter>
          ))}
      </StyleContext.Provider>
    ))
});
