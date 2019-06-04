import {Node} from "./Node";

export class TableNode extends Node {

  childrenWhiteList = ['thead', 'tbody', 'tr'];

  onAddChild(node: Node) {

  }

}
