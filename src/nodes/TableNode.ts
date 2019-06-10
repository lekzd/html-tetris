import {BaseNode} from "./Node";

export class TableNode extends BaseNode {

  childrenWhiteList = ['thead', 'tbody', 'tr'];

  onAddChild(node: BaseNode) {

  }

}
