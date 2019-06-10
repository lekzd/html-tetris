import {BaseNode} from "./Node";

export class TypographyNode extends BaseNode {

  childless = true;

  onCreate() {
    this.setAttribute('text', 'text');
  }

}
