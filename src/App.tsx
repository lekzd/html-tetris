import React, {PureComponent} from 'react';
import './App.css';
import {Stage} from 'react-pixi-fiber';
import {TERMINAL_THEME} from "./colorStyles";
import {router$} from "./routes";
import {interval, Subject} from 'rxjs/index';
import {EditorMode, IPlayerState, PlayersContext} from './entities/PlayersContext';
import {KeyBoardInput} from './entities/KeyBoardInput';
import {color} from './utils/color';

export const mainTimer$ = interval(100);

interface IProps {}

interface IState {
  routerState: typeof router$.value;
  players: IPlayerState[];
}

export const setPlayerState$ = new Subject<Partial<IPlayerState>>();

const height = 800;
const width = 1200;
const OPTIONS = {
  backgroundColor: TERMINAL_THEME.background,
  autoResize: true,
  resolution: Math.min(window.devicePixelRatio, 2) || 1,
};

export class App extends PureComponent<IProps, IState> {
  state = {
    routerState: router$.value,
    players: [
      {
        id: Math.random().toString(36),
        name: 'Red',
        color: color('#ff0000'),
        editorMode: EditorMode.INSERT,
        input$: new KeyBoardInput(),
      }
    ],
  };

  componentWillMount() {
    router$.subscribe(routerState => {
      this.setState({routerState});
    });

    setPlayerState$.subscribe(newState => {
      this.setState({
        players: [
          {
            ...this.state.players[0],
            ...newState
          }
        ]
      })
    });
  }

  render() {
    const [component, props] = this.state.routerState;

    return (
      <div className="App">
        <Stage options={OPTIONS} width={width} height={height}>
          <PlayersContext.Provider value={this.state.players}>
            {React.createElement(component as any, props)}
          </PlayersContext.Provider>
        </Stage>
      </div>
    );
  }
}

export default App;
