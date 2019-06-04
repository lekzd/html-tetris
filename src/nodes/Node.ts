import {Dom} from "../entities/Dom";
import {randomChoice} from '../utils/random';

const randomClasses = [
  'b__element--modificator',
  'item',
  'block',
  'button',
  'hidden',
  'header',
  'footer',
  'pt20 pb20 pl10 pr10',
];

const randomIds = [
  'first',
  'second',
  'third',
  'header',
];

const randomSizes = [
  '100%',
  '300px',
  '50%',
  '100px',
];

const randomStyles = [
  'position: relative; z-index: 1',
  'visibility: hidden',
  'width: auto',
  'height: auto',
];

const randomJS = [
  'alert("hi!")',
  'history.back()',
];

export class Node {

  childless = false;
  attributes = new Map<string, string>();
  children: Node[] = [];

  childrenWhiteList: string[] = [];

  constructor(protected dom: Dom,
              public name: string,
              public parent?: Node) {
  }

  addAttribute(name: string) {

    if (this.attributes.has(name)) {
      throw Error(`Already has attribute "${name}"`);
    }

    this.attributes.set(name, '');

    if (name === 'class') {
      this.attributes.set(name, randomChoice(randomClasses));
    }

    if (name === 'id') {
      this.attributes.set(name, randomChoice(randomIds));
    }

    if (name === 'width') {
      this.attributes.set(name, randomChoice(randomSizes));
    }

    if (name === 'height') {
      this.attributes.set(name, randomChoice(randomSizes));
    }

    if (name === 'style') {
      this.attributes.set(name, randomChoice(randomStyles));
    }

    if (name === 'onclick') {
      this.attributes.set(name, randomChoice(randomJS));
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
