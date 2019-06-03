import {storiesOf} from "@storybook/react";
import React from "react";
import {Stage} from 'react-pixi-fiber';
import {TERMINAL_THEME} from "../src/colorStyles";

const height = 800;
const width = 800;
const OPTIONS = {
  backgroundColor: TERMINAL_THEME.background,
  autoResize: true,
  resolution: Math.min(window.devicePixelRatio, 2) || 1,
};

export const story = (name: string) => storiesOf(name, module)
  .addDecorator(getChildren => (
    <div className="App">
      <Stage options={OPTIONS} width={width} height={height}>
        {getChildren()}
      </Stage>
    </div>
  ));
