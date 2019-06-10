import {BaseNode} from "./Node";

export class SvgNode extends BaseNode {

  childrenWhiteList = ['path', 'style'];

  onAddChild(node: BaseNode) {

  }

}
