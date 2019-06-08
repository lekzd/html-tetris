import {Node} from "./Node";
import {Stack} from '../utils/Stack';

export class InputNode extends Node {

  childless = true;

  onCreate() {
    this.attributesConfig = {
      ...this.attributesConfig,

      type: new Stack([
        'text',
        'password',
        'submit',
        'image',
        'date',
        'datetime',
        'range',
        'checkbox',
        'radio',
      ]),

      name: new Stack([
        'name',
        'password',
      ]),
    }
  }

}
