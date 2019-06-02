import React, {PureComponent} from 'react';
import './App.css';
import {Stage} from 'react-pixi-fiber';
import {TERMINAL_THEME} from "./colorStyles";
import {router$} from "./routes";

const height = 800;
const width = 1200;
const OPTIONS = {
  backgroundColor: TERMINAL_THEME.background,
  autoResize: true,
  resolution: Math.max(window.devicePixelRatio, 2) || 1,
};

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
