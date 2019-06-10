import React, {Fragment, PureComponent} from "react";
import {CELL_HEIGHT, CELL_WIDTH, Command, gameScrollState$} from "../constants";
import {Dom} from "../entities/Dom";
import {Observable, Subject} from "rxjs";
import {Rectangle} from '../atoms/Rectangle';
import {takeUntil} from "rxjs/operators";
import {BaseNode, NodeSectionType} from '../nodes/Node';
import {color} from '../utils/color';
import {Word} from '../atoms/Word';

interface IProps {
  dom: Dom;
  input$: Observable<Command>;
}

interface IState {
  text: string;
  x: number;
  selectedIndex: number;
  selectedTag: BaseNode | null;
  sectionIndex: number;
}

export class VisualPlayer extends PureComponent<IProps, IState> {

  private dom = this.props.dom;
  private unmount$ = new Subject();
  private firstIndex = this.dom.indexesStack.next();

  state = {
    x: 1,
    text: 'Container',
    selectedIndex: this.firstIndex,
    selectedTag: this.dom.getNodeByIndex(this.firstIndex),
    sectionIndex: 0,
  };

  private goToNode(targetOffset: number) {
    let {sectionIndex, selectedIndex, selectedTag, x, text} = this.state;

    if (!selectedTag) {
       return;
    }

    sectionIndex = 0;

    if (targetOffset === 0) {
       selectedIndex = this.dom.getNodeIndex(selectedTag);
    }

    if (targetOffset > 0) {
       selectedIndex = this.dom.indexesStack.next();
    }

    if (targetOffset < 0) {
       selectedIndex = this.dom.indexesStack.prev();
    }

    selectedTag = this.dom.getNodeByIndex(selectedIndex);

    if (selectedTag) {
      const [tagMetrics] = selectedTag.renderedMetrics;
      x = tagMetrics.start;
      text = tagMetrics.name;

      this.setState({sectionIndex, selectedIndex, selectedTag, x, text});
    }
  }

  private goToAttribute(targetOffset: number) {
    let {sectionIndex, selectedTag, x, text} = this.state;

    if (!selectedTag) {
      return;
    }

    sectionIndex += targetOffset;

    const section = selectedTag.renderedMetrics[sectionIndex];

    if (section) {
      x = section.start;

      if (section.type === NodeSectionType.ATTR) {
        text = `${section.name}="${section.value}"`;
      } else {
        text = section.name;
      }

      this.setState({sectionIndex, selectedTag, x, text});
    }
  }

  private verticalEdit(targetOffset: number) {
    let {sectionIndex, selectedTag} = this.state;

    if (!selectedTag) {
      return;
    }

    if (sectionIndex === 0) {
      if (targetOffset > 0) {
        this.dom.moveNodeDown(selectedTag);
        this.goToNode(0);
      } else {
        this.dom.moveNodeUp(selectedTag);
        this.goToNode(0);
      }
      return;
    }

    const section = selectedTag.renderedMetrics[sectionIndex];

    if (section && section.type === NodeSectionType.ATTR) {
      const stack = selectedTag.attributesConfig[section.name];

      if (stack) {
        this.dom.setAttribute(section.name, targetOffset > 0 ? stack.next() : stack.prev(), selectedTag);
        this.goToAttribute(0);
      }
    }
  }

  private doCommand(command: Command) {
    switch (command) {
      case Command.BOTTOM:
        this.verticalEdit(+1);
        break;

      case Command.SHIFT_BOTTOM:
        this.goToNode(+1);
        break;

      case Command.TOP:
        this.verticalEdit(-1);
        break;

      case Command.SHIFT_TOP:
        this.goToNode(-1);
        break;

      case Command.LEFT:
      case Command.SHIFT_LEFT:
        this.goToAttribute(-1);
        break;

      case Command.RIGHT:
      case Command.SHIFT_RIGHT:
        this.goToAttribute(+1);
        break;
    }

    // this.setState({oldX, oldY});
  }

  componentWillMount() {
    this.dom = this.props.dom;

    this.props.input$
      .pipe(takeUntil(this.unmount$))
      .subscribe(command => {
        this.doCommand(command);
      });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    const width = this.state.text.length * CELL_WIDTH;
    const height = CELL_HEIGHT;
    const {leftOffset, topOffset} = gameScrollState$.value;

    return this.state.selectedTag &&
      <Fragment>
        <Rectangle
          x={(leftOffset + this.state.x) * CELL_WIDTH}
          y={(this.state.selectedIndex + topOffset) * CELL_HEIGHT}
          width={width}
          height={height}
          fill={color('#ff0000')}
        />
        <Word
          x={(leftOffset + this.state.x) * CELL_WIDTH}
          y={(this.state.selectedIndex + topOffset) * CELL_HEIGHT}
          fill={color('#ffffff')}
          text={this.state.text}
        />
      </Fragment>
  }
}
