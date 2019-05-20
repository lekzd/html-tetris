import React from 'react';
import './App.css';
import {Stage} from 'react-pixi-fiber';
import {color} from "./utils/color";
import {GameRoom} from "./rooms/GameRoom";

const height = 500;
const width = 500;
const OPTIONS = {
  backgroundColor: color('#250b23')
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Stage options={OPTIONS} width={width} height={height}>
        <GameRoom />
      </Stage>
    </div>
  );
};

export default App;
