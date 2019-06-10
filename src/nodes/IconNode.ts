import {BaseNode} from "./Node";

export class IconNode extends BaseNode {

  childless = true;

  onCreate() {
    this.setAttribute('text', 'star');
  }

}
