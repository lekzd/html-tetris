import {Dom} from "./Dom";

export class Node {

  childless = false;

  constructor(protected dom: Dom,
              public name: string,
              public parent?: Node) {
  }

  onCreate() {

  }

  onAddAttribute(name: string) {

  }

  onAddChild(node: Node) {

  }

}
