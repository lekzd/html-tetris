import React, {Fragment, PureComponent} from 'react';
import {Container} from 'react-pixi-fiber';
import {Observable, Subject} from "rxjs";
import {filter, takeUntil} from "rxjs/operators";
import {CELL_HEIGHT, CELL_WIDTH, Command} from "../constants";
import {COLOR_STYLES} from "../colorStyles";
import {SymbolType} from "../entities/SymbolType";
import {Word} from "../atoms/Word";
import {StyleContext} from "../entities/StyleContext";

interface IProps {
  input$: Observable<Command>;
  onChange: (spaces: number) => void;
}

interface IState {
  offset: number;
}

const SPACES = [1, 2, 3, 4, 5, 6];

export class ChooseSpacesSelect extends PureComponent<IProps, IState> {
  private unmount$ = new Subject();

  state = {
    offset: 0,
  };

  componentWillMount() {
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
        filter(command => this.state.offset < SPACES.length - 1),
      );

    moveTop$.subscribe(() => {
      let {offset} = this.state;

      offset--;

      this.setState({offset});
      this.props.onChange(SPACES[offset]);
    });

    moveBottom$.subscribe(() => {
      let {offset} = this.state;

      offset++;

      this.setState({offset});
      this.props.onChange(SPACES[offset]);
    });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return (
      <StyleContext.Consumer>
        {style => (
          <Fragment>
            <Word x={CELL_WIDTH} y={CELL_HEIGHT} text={'Spaces:'} fill={style[SymbolType.TAG]}/>
            <Container x={10 * CELL_WIDTH}>
              {SPACES.map((name, index) => (
                <Container key={index} y={(index - this.state.offset) * CELL_HEIGHT * 4}>
                  <Word x={CELL_WIDTH} y={CELL_HEIGHT} text={name.toString()} fill={style[SymbolType.TAG]}/>
                </Container>
              ))}
            </Container>
          </Fragment>
        )}
      </StyleContext.Consumer>
    )
  }
}
