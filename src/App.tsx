import React, {PureComponent} from 'react';
import './App.css';
import {Stage} from 'react-pixi-fiber';
import {TERMINAL_THEME} from "./colorStyles";
import {router$} from "./routes";
import {interval} from 'rxjs/index';

export const mainTimer$ = interval(100);

const height = 800;
const width = 1200;
const OPTIONS = {
  backgroundColor: TERMINAL_THEME.background,
  autoResize: true,
  resolution: Math.min(window.devicePixelRatio, 2) || 1,
};

export class App extends PureComponent {
  state = {
    routerState: router$.value,
  };

  componentWillMount() {
    router$.subscribe(routerState => {
      this.setState({routerState});
    })
  }

  render() {
    const [component, props] = this.state.routerState;

    return (
      <div className="App">
        <Stage options={OPTIONS} width={width} height={height}>
          {React.createElement(component as any, props)}
        </Stage>
      </div>
    );
  }
}

export default App;
