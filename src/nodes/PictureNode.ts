import {BaseNode} from "./Node";

export class PictureNode extends BaseNode {

  childrenWhiteList = ['source', 'img'];

  onAddChild(node: BaseNode) {

  }

}
