import {BaseNode} from "./Node";
import {Stack} from '../utils/Stack';

export class UlNode extends BaseNode {

  childrenWhiteList = ['li'];

  onCreate() {
    this.attributesConfig = {
      ...this.attributesConfig,

      class: new Stack([
        'circles',
        'rounds',
        'no-bullets',
      ]),
    }
  }

}
