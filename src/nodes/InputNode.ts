import {Node} from "./Node";
import {randomChoice} from '../utils/random';

const randomTypes = [
  'text',
  'password',
  'submit',
  'image',
  'date',
  'datetime',
  'range',
  'checkbox',
  'radio',
];

const randomNames = [
  'name',
  'password',
];

export class InputNode extends Node {

  childless = true;

  onAddAttribute(name: string) {
    if (name === 'type') {
      this.attributes.set(name, randomChoice(randomTypes));
    }

    if (name === 'name') {
      this.attributes.set(name, randomChoice(randomNames));
    }
  }

}
