import React, {PureComponent} from 'react';
import './App.css';
import {Stage} from 'react-pixi-fiber';
import {ChooseRoom} from "./rooms/ChooseRoom";
import {TERMINAL_THEME} from "./colorStyles";
import {BehaviorSubject} from "rxjs";
import {NewGameRoom} from "./rooms/NewGameRoom";
import {IStyle} from "./entities/StyleContext";

const height = 800;
const width = 1200;
const OPTIONS = {
  backgroundColor: TERMINAL_THEME.background,
  autoResize: true,
  resolution: Math.max(window.devicePixelRatio, 2) || 1,
};

export type ChooseRoomRoute = [
  typeof ChooseRoom,
  {
    name: string;
  }
]

export type GameRoomRoute = [
  typeof NewGameRoom,
  {
    style: IStyle;
    spaces: number;
  }
]

type routes = ChooseRoomRoute | GameRoomRoute;

export const router$ = new BehaviorSubject<routes>([ChooseRoom, {name: ''}]);

export class App extends PureComponent {
  state = {
    activeComponent: router$.value[0],
  };

  componentWillMount() {
    router$.subscribe(([activeComponent]) => {
      this.setState({activeComponent});
    })
  }

  render() {
    return (
      <div className="App">
        <Stage options={OPTIONS} width={width} height={height}>
          {React.createElement(this.state.activeComponent)}
        </Stage>
      </div>
    );
  }
}

export default App;
