import React, {PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Observable, Subject} from "rxjs";
import {filter, takeUntil} from "rxjs/operators";
import {CELL_HEIGHT, CELL_WIDTH, Command} from "../constants";
import {Rectangle} from "../atoms/Rectangle";
import {COLOR_STYLES} from "../colorStyles";
import {SymbolType} from "../entities/SymbolType";
import {Word} from "../atoms/Word";
import {IStyle, StyleContext} from "../entities/StyleContext";

interface IProps {
  input$: Observable<Command>;
  onChange: (style: IStyle) => void;
}

interface IState {
  offset: number;
}

type StyleName = keyof typeof COLOR_STYLES;

export class ChooseStyleSelect extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();

  state = {
    offset: 0,
  };

  componentWillMount() {
    const styles = Object.keys(COLOR_STYLES) as StyleName[];

    const moveTop$ = this.props.input$
      .pipe(
        takeUntil(this.unmount$),
        filter(command => [Command.TOP, Command.SHIFT_TOP].includes(command)),
        filter(command => this.state.offset > 0),
      );

    const moveBottom$ = this.props.input$
      .pipe(
        takeUntil(this.unmount$),
        filter(command => [Command.BOTTOM, Command.SHIFT_BOTTOM].includes(command)),
        filter(command => this.state.offset < styles.length - 1),
      );

    moveTop$.subscribe(() => {
      let {offset} = this.state;

      offset--;

      this.setState({offset});
      this.props.onChange(COLOR_STYLES[styles[offset]]);
    });

    moveBottom$.subscribe(() => {
      let {offset} = this.state;

      offset++;

      this.setState({offset});
      this.props.onChange(COLOR_STYLES[styles[offset]]);
    });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    const styles = Object.keys(COLOR_STYLES) as StyleName[];

    return (
      <Container>
        <StyleContext.Consumer>
          {style => (
            <Word x={CELL_WIDTH} y={CELL_HEIGHT} text={'Style:'} fill={style[SymbolType.TAG]}/>
          )}
        </StyleContext.Consumer>
        <Container x={10 * CELL_WIDTH}>
          {styles.map((name, index) => (
            <Container key={index} y={(index - this.state.offset) * CELL_HEIGHT * 4}>
              <Rectangle
                x={0}
                y={0}
                width={16 * CELL_WIDTH}
                height={3 * CELL_HEIGHT}
                fill={COLOR_STYLES[name][SymbolType.BACKGROUND]}
              />
              <Word x={CELL_WIDTH} y={CELL_HEIGHT} text={name} fill={COLOR_STYLES[name][SymbolType.TAG]}/>
            </Container>
          ))}
        </Container>
      </Container>
    )
  }
}
