import {BaseNode} from "./Node";

export class VideoNode extends BaseNode {

  childrenWhiteList = ['source'];

  onAddChild(node: BaseNode) {

  }

}
