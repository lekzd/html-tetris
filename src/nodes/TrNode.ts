import {Node} from "./Node";

export class TrNode extends Node {

  childrenWhiteList = ['td', 'th'];

  onAddChild(node: Node) {

  }

}
