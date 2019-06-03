import {Node} from "./Node";

export class TableNode extends Node {

  onAddChild(node: Node) {

    if (node.name !== 'tr') {
      throw Error('You can not pass something instead of tr');
    }

  }

}
