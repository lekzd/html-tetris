import {BaseNode} from "./Node";

export class ButtonNode extends BaseNode {

  childless = true;

  onCreate() {
    this.setAttribute('text', 'button');
  }

}
