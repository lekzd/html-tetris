import React from 'react';
import { storiesOf } from '@storybook/react';
import {Stage} from 'react-pixi-fiber';
import {NewGameRoom} from '../src/rooms/NewGameRoom';
import {BACKGROUND_COLOR} from '../src/constants';

const height = 800;
const width = 800;
const OPTIONS = {
  backgroundColor: BACKGROUND_COLOR,
  autoResize: true,
  resolution: Math.max(window.devicePixelRatio, 2) || 1,
};

storiesOf('NewGameRoom', module)
  .addDecorator(getChildren => (
    <div className="App">
      <Stage options={OPTIONS} width={width} height={height}>
        {getChildren()}
      </Stage>
    </div>
  ))
  .add('General', () => (
    <NewGameRoom />
  ));
