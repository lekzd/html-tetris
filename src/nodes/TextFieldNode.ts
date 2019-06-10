import {BaseNode} from "./Node";

export class TextFieldNode extends BaseNode {

  childless = true;

  onCreate() {
    this.setAttribute('label', 'name');
    this.setAttribute('margin', 'normal');
  }

}
