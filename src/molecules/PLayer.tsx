import React, {Fragment, PureComponent} from "react";
import {CELL_HEIGHT, CELL_WIDTH, Command, HEIGHT, PLAYER_COLOR, RANDOM_TAGS, RANDOM_TEXTS, WIDTH} from "../constants";
import {Dom} from "../entities/Dom";
import {Observable, Subject, timer} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Word} from "../atoms/Word";
import {Filter} from "../atoms/Filter";

import playerShader from '../shaders/player.frag';

interface IProps {
  dom: Dom;
  input$: Observable<Command>;
}

interface IState {
  state: Command;
  text: string;
  x: number;
  oldX: number;
  y: number;
  oldY: number;
}

export class Player extends PureComponent<IProps, IState> {

  private dom = new Dom();
  private unmount$ = new Subject();

  state = {
    state: Command.IDLE,
    text: RANDOM_TAGS[Math.floor(Math.random() * RANDOM_TAGS.length)],
    x: WIDTH >> 1,
    oldX: WIDTH >> 1,
    y: 0,
    oldY: 0,
  };

  private reSpawn() {
    const x = WIDTH >> 1;
    const oldX = WIDTH >> 1;
    const y = 0;
    const oldY = 0;
    const state = Command.BOTTOM;
    const text = RANDOM_TEXTS[Math.floor(Math.random() * RANDOM_TEXTS.length)];

    this.setState({x, oldX, y, oldY, state, text});
  }

  private getVerticalOffsetToCollide(x: number, y: number, targetOffset: number): number {
    let offset = targetOffset / Math.abs(targetOffset);

    if (targetOffset < 0) {
      while (!this.dom.getNodeByPosition(x, y + offset)) {
        if (offset === targetOffset) {
          break;
        }
        offset--;
      }
    } else {
      while (!this.dom.getNodeByPosition(x, y + offset)) {
        if (offset === targetOffset) {
          break;
        }
        offset++;
      }
    }

    return offset;
  }

  private getHorizontalOffsetToCollide(x: number, y: number, targetOffset: number): number {
    let offset = targetOffset / Math.abs(targetOffset);

    if (targetOffset < 0) {
      while (!this.dom.getNodeByPosition(x + offset, y)) {
        if (offset === targetOffset) {
          break;
        }
        offset--;
      }
    } else {
      while (!this.dom.getNodeByPosition(x + offset, y)) {
        if (offset === targetOffset) {
          break;
        }
        offset++;
      }
    }

    return offset;
  }

  private tryVerticalMove(targetOffset: number) {
    let {x, y, state, text} = this.state;
    const offset = this.getVerticalOffsetToCollide(x, y, targetOffset);

    y += offset;

    const node = this.dom.getNodeByPosition(x, y);

    if (node) {

      try {
        this.dom.addAttribute(text, node);
        this.reSpawn();

        return;
      } catch (e) {
        if ([Command.TOP, Command.SHIFT_TOP].includes(state)) {
          this.setState({state: Command.BOTTOM});
          return;
        }

        if ([Command.BOTTOM, Command.SHIFT_BOTTOM].includes(state)) {
          this.setState({state: Command.TOP});
          return;
        }
      }
    }

    if (y < 0 || y > HEIGHT || x < 0 || x > WIDTH) {
      this.reSpawn();

      return;
    }

    this.setState({x, y, state, text});
  }

  private tryHorizontalMove(targetOffset: number) {
    let {x, y, state, text} = this.state;
    const offset = this.getHorizontalOffsetToCollide(x, y, targetOffset);

    x += offset;

    const node = this.dom.getNodeByPosition(x, y);

    if (node) {

      try {
        const {childless, parent} = node;

        if (childless) {
          this.dom.pushNode(text, parent);
        } else {
          this.dom.unshiftNode(text, node);
        }

        this.reSpawn();

        return;
      } catch (e) {
        if ([Command.LEFT, Command.SHIFT_LEFT].includes(state)) {
          this.setState({state: Command.RIGHT});
          return;
        }

        if ([Command.RIGHT, Command.SHIFT_RIGHT].includes(state)) {
          this.setState({state: Command.LEFT});
          return;
        }
      }
    }

    if (y < 0 || y > HEIGHT || x < 0 || x > WIDTH) {
      this.reSpawn();

      return;
    }

    this.setState({x, y, state, text});
  }

  private tick() {
    let {oldX, oldY, x, y} = this.state;

    if (oldX < x) {
      oldX = x - 1;
    }

    if (oldY < y) {
      oldY = y - 1;
    }

    if (oldX > x) {
      oldX = x + 1;
    }

    if (oldY > y) {
      oldY = y + 1;
    }

    switch (this.state.state) {
      case Command.BOTTOM:
        oldX = x;
        this.tryVerticalMove(+1);
        break;

      case Command.SHIFT_BOTTOM:
        oldX = x;
        oldY = y;
        this.tryVerticalMove(+5);
        this.setState({state: Command.BOTTOM});
        break;

      case Command.TOP:
        oldX = x;
        this.tryVerticalMove(-1);
        break;

      case Command.SHIFT_TOP:
        oldX = x;
        oldY = y;
        this.tryVerticalMove(-5);
        this.setState({state: Command.TOP});
        break;

      case Command.LEFT:
        oldY = y;
        this.tryHorizontalMove(-1);
        break;

      case Command.SHIFT_LEFT:
        oldY = y;
        oldX = x;
        this.tryHorizontalMove(-7);
        this.setState({state: Command.LEFT});
        break;

      case Command.RIGHT:
        oldY = y;
        this.tryHorizontalMove(+1);
        break;

      case Command.SHIFT_RIGHT:
        oldY = y;
        oldX = x;
        this.tryHorizontalMove(+7);
        this.setState({state: Command.RIGHT});
        break;
    }

    this.setState({oldX, oldY});
  }

  componentWillMount() {
    this.dom = this.props.dom;

    timer(0, 200)
      .pipe(takeUntil(this.unmount$))
      .subscribe(() => this.tick());

    this.props.input$.subscribe(command => {
      this.setState({state: command});
    });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    const oldX = this.state.oldX * CELL_WIDTH;
    const oldY = this.state.oldY * CELL_HEIGHT;

    const newX = this.state.x * CELL_WIDTH;
    const newY = this.state.y * CELL_HEIGHT;

    const diffX = Math.abs(oldX - newX);
    const diffY = Math.abs(oldY - newY);

    const width = diffX + (this.state.text.length * CELL_WIDTH);
    const height = diffY + CELL_HEIGHT;

    const left = Math.min(oldX, newX);
    const top = Math.min(oldY, newY);

    const textLeft = left + Math.max(newX - oldX, 0);
    const textTop = top + Math.max(newY - oldY, 0);

    return (
      <Fragment>
        <Filter x={left} y={top} width={width} height={height} shader={playerShader}>
          <Word
            x={0}
            y={0}
            text={this.state.text}
            fill={PLAYER_COLOR}
          />
        </Filter>
        <Word
          x={textLeft}
          y={textTop}
          text={this.state.text}
          fill={PLAYER_COLOR}
        />
      </Fragment>
    )
  }
}
