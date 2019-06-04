import {Node} from "./Node";

export class SvgNode extends Node {

  childrenWhiteList = ['path', 'style'];

  onAddChild(node: Node) {

  }

}
