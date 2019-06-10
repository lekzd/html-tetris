import {BaseNode} from "./Node";

export class AppBarNode extends BaseNode {

  onCreate() {
    this.setAttribute('position', 'static');
  }

}
