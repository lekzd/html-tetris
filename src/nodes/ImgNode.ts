import {BaseNode} from "./Node";
import {Stack} from '../utils/Stack';

export class ImgNode extends BaseNode {

  childless = true;

  onCreate() {
    this.attributesConfig = {
      ...this.attributesConfig,

      src: new Stack([
        'cat.png',
        'dog.png',
        'bird.png',
      ]),

      'aria-label': new Stack([
        'Cat',
        'Dog',
        'Bird',
      ]),

      alt: new Stack([
        'Cat',
        'Dog',
        'Bird',
      ]),

      title: new Stack([
        'Cat',
        'Dog',
        'Bird',
      ])
    }
  }

}
