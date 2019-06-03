import {Dom} from "./Dom";

export class Node {

  childless = false;
  attributes = new Map<string, string>();

  constructor(protected dom: Dom,
              public name: string,
              public parent?: Node) {
  }

  addAttribute(name: string) {
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
