import {BaseNode} from "./Node";

export class TrNode extends BaseNode {

  childrenWhiteList = ['td', 'th'];

  onAddChild(node: BaseNode) {

  }

}
