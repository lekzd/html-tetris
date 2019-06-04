import {Node} from "./Node";

export class PictureNode extends Node {

  childrenWhiteList = ['source', 'img'];

  onAddChild(node: Node) {

  }

}
