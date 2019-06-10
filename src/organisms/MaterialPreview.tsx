import React, {PureComponent} from 'react';
import {Observable, Subject} from 'rxjs/index';
import {BaseNode} from '../nodes/Node';
import {takeUntil} from 'rxjs/internal/operators';
import * as material from '@material-ui/core';

interface IProps {
  input$: Observable<BaseNode>;
}

interface IState {
  nodesToRender: React.ReactElement;
}

export class MaterialPreview extends PureComponent<IProps, IState> {

  private unmount$ = new Subject();

  state = {
    nodesToRender: React.createElement(material.Button, {variant: 'contained', color: 'primary', children: ['op']}),
  };

  private traverseNode(node: BaseNode, key?: number): React.ReactElement {
    const {name} = node;
    const children: React.ReactElement[] = [];
    const props: React.Props<React.ReactElement> = {children, key};

    // @ts-ignore
    if (!material[name]) {
      throw Error(`No material component with name "${name}"`);
    }

    node.attributes.forEach((value, name) => {
      // @ts-ignore
      props[name] = value;
    });

    // @ts-ignore
    if (props.text) {
      // @ts-ignore
      children.push(props.text);
    }

    if (node.children.length) {
      children.push(...node.children.map((child, i) => this.traverseNode(child, i)));
    }

    // @ts-ignore
    return React.createElement(material[name], props);
  }

  private setLinesToState(baseNode: BaseNode) {
    console.log('baseNode', baseNode.children.map(node => node.name));

    this.setState({
      nodesToRender: this.traverseNode(baseNode),
    });
  }

  componentWillMount() {
    this.props.input$
      .pipe(takeUntil(this.unmount$))
      .subscribe(baseNode => {
        this.setLinesToState(baseNode)
      });
  }

  componentWillUnmount() {
    this.unmount$.next();
  }

  render() {
    return this.state.nodesToRender;
  }
}
