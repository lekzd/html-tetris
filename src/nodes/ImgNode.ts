import {Node} from "./Node";

export class ImgNode extends Node {

  childless = true;

  onAddAttribute(name: string) {
    if (name === 'src') {
      this.attributes.set('src', 'cat.png');
    }

    if (name === 'aria-label') {
      this.attributes.set('aria-label', 'a11y');
    }

    if (name === 'title') {
      this.attributes.set('title', 'cat');
    }

    if (name === 'class') {
      this.attributes.set('class', 'cat-img');
    }
  }

}
