import React from 'react';
import {NewGameRoom} from '../src/rooms/NewGameRoom';
import {StyleContext} from "../src/entities/StyleContext";
import {COLOR_STYLES} from "../src/colorStyles";
import {CodeView} from "../src/organisms/CodeView";
import {story} from "./utils";
import {ChooseRoom} from "../src/rooms/ChooseRoom";
import {JoinRoom} from "../src/rooms/JoinRoom";

story('JoinRoom')
  .add('General', () => (
    <JoinRoom />
  ));

story('ChooseRoom')
  .add('General', () => (
    <ChooseRoom name={''} />
  ));

story('NewGameRoom')
  .add('General', () => (
    <NewGameRoom style={COLOR_STYLES.Gruvbox} spaces={4} />
  ));

const storiesModule = story('CodeView');
const codeLines = [
  '<body>',
  '  <div class="form-item">',
  '    <input name="formInput" value="" />',
  '  </div>',
  '</body>'
];

Object.keys(COLOR_STYLES).forEach(key => {
  storiesModule
    .add(`Themes/${key}`, () => (
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
