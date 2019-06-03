import {Dom} from "./Dom";

export class Node {

  childless = false;
  attributes = new Map<string, string>();

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

  onCreate() {

  }

  onAddAttribute(name: string) {

  }

  onAddChild(node: Node) {

  }

}
