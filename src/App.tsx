import React from 'react';
import './App.css';
import {Stage} from 'react-pixi-fiber';
import {BACKGROUND_COLOR} from "./constants";
import {ChooseRoom} from "./rooms/ChooseRoom";
import {NewGameRoom} from "./rooms/NewGameRoom";

const height = 800;
const width = 1200;
const OPTIONS = {
  backgroundColor: BACKGROUND_COLOR,
  autoResize: true,
  resolution: Math.max(window.devicePixelRatio, 2) || 1,
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Stage options={OPTIONS} width={width} height={height}>
        <ChooseRoom />
        {/*<NewGameRoom />*/}
      </Stage>
    </div>
  );
};

export default App;
