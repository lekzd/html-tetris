import {Dom} from "../entities/Dom";
import {Stack} from '../utils/Stack';

export enum NodeSectionType {
  TAG, ATTR
}

export interface INodeSection {
  type: NodeSectionType,
  name: string;
  value: string;
  start: number;
  end: number;
}

interface IAttributesConfig {
  [Key: string]: Stack<string>;
}

const sizes = [
  '10%',
  '20%',
  '30%',
  '40%',
  '50%',
  '60%',
  '70%',
  '80%',
  '90%',
  '100%',
  'auto',
];

export class Node {

  childless = false;
  attributes = new Map<string, string>();
  children: Node[] = [];
  renderedMetrics: INodeSection[] = [];

  childrenWhiteList: string[] = [];

  attributesConfig: IAttributesConfig = {
    class: new Stack([
      'flex-row',
      'flex-column',
      'flex-center',
      'space-between',
      'space-around',
    ]),

    id: new Stack([
      'first',
      'second',
      'third',
      'header',
    ]),

    width: new Stack(sizes),

    height: new Stack(sizes),

    style: new Stack([
      'position: relative; z-index: 1',
      'visibility: hidden',
      'border: 3px solid black',
    ]),

    onclick: new Stack([
      'alert("hi!")',
      'history.back()',
    ]),

    role: new Stack([
      'label',
      'button',
      'banner',
      'form',
      'checkbox',
      'main',
    ]),
  };

  constructor(protected dom: Dom,
              public name: string,
              public parent?: Node) {
  }

  setAttribute(name: string, value: string) {
    this.attributes.set(name, value);
  }

  getAttributeValues(name: string): string[] {
    if (!this.attributesConfig.hasOwnProperty(name)) {
      return [];
    }

    return this.attributesConfig[name].slice(0, 5);
  }

  addAttribute(name: string) {

    if (this.attributes.has(name)) {
      throw Error(`Already has attribute "${name}"`);
    }

    this.attributes.set(name, '');

    if (this.attributesConfig.hasOwnProperty(name)) {
      this.attributes.set(name, this.attributesConfig[name].next());
    }

    this.onAddAttribute(name);
  }

  addChild(node: Node) {
    this.children.push(node);

    if (this.childrenWhiteList.length && !this.childrenWhiteList.includes(node.name)) {
      throw Error(`<${this.name}> can't have ${node.name} as a child`);
    }

    this.onAddChild(node);
  }

  onCreate() {

  }

  onAddAttribute(name: string) {

  }

  onAddChild(node: Node) {

  }

}
