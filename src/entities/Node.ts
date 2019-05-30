import {Dom} from "./Dom";

export class Node {

  childless = false;

  constructor(protected dom: Dom, public tagName: string) {

  }

  onCreate() {

  }

  onAddAttribute(name: string) {

  }

  onAddChild(node: Node) {

  }

}
