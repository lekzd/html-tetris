import {Dom} from "../entities/Dom";

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
