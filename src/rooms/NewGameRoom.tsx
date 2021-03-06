import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Dom} from "../entities/Dom";
import {CELL_HEIGHT, CELL_WIDTH, gameScrollState$, HEIGHT, WIDTH} from "../constants";
import {Player} from "../molecules/Player";
import {Rectangle} from "../atoms/Rectangle";
import {IStyle, StyleContext} from "../entities/StyleContext";
import {COLOR_STYLES} from "../colorStyles";
import {SymbolType} from "../entities/SymbolType";
import {CodeView} from "../organisms/CodeView";
import {AffectedLines} from '../molecules/AffectedLines';
import {PlayersContext} from '../entities/PlayersContext';

interface IProps {
  style: IStyle;
  spaces: number;
}

interface IState {
  style: IStyle;
  lines: string[];
  affectedLines: number[];

  leftOffset: number;
  topOffset: number;
}

export class NewGameRoom extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();
  private dom = new Dom();

  state = {
    style: this.props.style,
    lines: [],
    affectedLines: [],
    leftOffset: 0,
    topOffset: 0,
  };

  getRandomStyle(): IStyle {
    const keys = Object.keys(COLOR_STYLES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof COLOR_STYLES;

    return COLOR_STYLES[randomKey];
  }

  componentWillMount() {

    // setInterval(() => {
    //   this.setState({
    //     style: this.getRandomStyle()
    //   })
    // }, 5000);

    this.dom.affectedLines$
      .pipe(
        takeUntil(this.unmount$)
      ).subscribe(lines => {

        this.setState({affectedLines: lines});

        setTimeout(() => {
          this.setState({affectedLines: []});
        }, 300);

      });

    gameScrollState$
      .pipe(
        takeUntil(this.unmount$)
      ).subscribe(({leftOffset, topOffset}) => {
        this.setState({leftOffset, topOffset});
      });

    this.dom
      .pipe(
        takeUntil(this.unmount$)
      ).subscribe(lines => {
        const topOffset = (HEIGHT - lines.length) >> 1;
        const leftOffset = 3;

        gameScrollState$.next({leftOffset, topOffset});

        this.setState({lines, leftOffset, topOffset});
      });

    this.dom.pushNode('body');
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <StyleContext.Provider value={this.state.style}>
        <Container>

          <Rectangle
            x={0}
            y={0}
            width={WIDTH * CELL_WIDTH}
            height={HEIGHT * CELL_HEIGHT}
            fill={this.state.style[SymbolType.BACKGROUND]}
          />

          <CodeView
            lines={this.state.lines}
            leftOffset={this.state.leftOffset}
            topOffset={this.state.topOffset}
            linesHeight={HEIGHT}
            activeIndex={-1}
          />

          <AffectedLines
            dom={this.dom}
            leftOffset={this.state.leftOffset}
            topOffset={this.state.topOffset}
            lines={this.state.affectedLines}
          />

          <PlayersContext.Consumer>
            {players => players.map(config => (
              <Player
                key={config.id}
                id={config.id}
                name={config.name}
                mode={config.editorMode}
                dom={this.dom}
                firstElement={'img'}
                input$={config.input$}
              />
            ))}
          </PlayersContext.Consumer>

        </Container>
      </StyleContext.Provider>
    );
  }
}
