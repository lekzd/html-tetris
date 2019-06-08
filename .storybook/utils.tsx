import {storiesOf} from "@storybook/react";
import React from "react";
import {Stage} from 'react-pixi-fiber';
import {TERMINAL_THEME} from "../src/colorStyles";
import {EditorMode, PlayersContext} from '../src/entities/PlayersContext';
import {color} from '../src/utils/color';
import {KeyBoardInput} from '../src/entities/KeyBoardInput';

const height = 800;
const width = 800;
const OPTIONS = {
  backgroundColor: TERMINAL_THEME.background,
  autoResize: true,
  resolution: Math.min(window.devicePixelRatio, 2) || 1,
};

const players = [
  {
    id: Math.random().toString(36),
    name: 'Red',
    color: color('#ff0000'),
    editorMode: EditorMode.VISUAL,
    input$: new KeyBoardInput(),
  }
];

export const story = (name: string) => storiesOf(name, module)
  .addDecorator(getChildren => (
    <div className="App">
      <Stage options={OPTIONS} width={width} height={height}>
        <PlayersContext.Provider value={players}>
          {getChildren()}
        </PlayersContext.Provider>
      </Stage>
    </div>
  ));
