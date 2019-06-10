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

export class BaseNode {

  childless = false;
  attributes = new Map<string, string>();
  children: BaseNode[] = [];
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

    alignItems: new Stack([
      'center',
      'start',
      'end',
      'space-between',
      'space-around',
    ]),

    justify: new Stack([
      'center',
      'start',
      'end',
      'space-between',
      'space-around',
    ]),

    spacing: new Stack([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
    ]),

    xs: new Stack([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ]),

    width: new Stack(sizes),

    height: new Stack(sizes),

    direction: new Stack([
      'row',
      'column',
    ]),

    color: new Stack([
      'inherit',
      'primary',
      'secondary',
      'action',
      'error',
      'disabled',
    ]),

    variant: new Stack([
      'flat',
      'outline',
      'none',
    ]),
  };

  constructor(protected dom: Dom,
              public name: string,
              public parent?: BaseNode) {
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

  isContainer(): boolean {
    return this.attributes.has('container');
  }

  isContainerItem(): boolean {
    return this.attributes.has('item');
  }

  addAttribute(name: string) {

    if (this.attributes.has(name)) {
      throw Error(`Already has attribute "${name}"`);
    }

    this.attributes.set(name, '');

    if (this.attributesConfig.hasOwnProperty(name)) {
      this.attributes.set(name, this.attributesConfig[name].next());
    }

    if (['justify', 'alignItems', 'spacing', 'direction'].includes(name) && !this.isContainer()) {
      this.addAttribute('container');

      return;
    }

    if (name === 'container') {
      this.children.forEach(childNode => {
        childNode.addAttribute('item');
      })
    }

    this.onAddAttribute(name);
  }

  addChild(node: BaseNode) {
    this.children.unshift(node);

    if (this.childrenWhiteList.length && !this.childrenWhiteList.includes(node.name)) {
      throw Error(`<${this.name}> can't have ${node.name} as a child`);
    }

    if (this.isContainer()) {
      node.addAttribute('item');
    }

    this.onAddChild(node);
  }

  onCreate() {

  }

  onAddAttribute(name: string) {

  }

  onAddChild(node: BaseNode) {

  }

}
