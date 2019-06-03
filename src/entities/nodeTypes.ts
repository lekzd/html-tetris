import {Node} from './Node';
import {InputNode} from "./InputNode";
import {ImgNode} from "./ImgNode";
import {TableNode} from "./TableNode";

export const nodeTypes: {[key: string]: typeof Node} = {
  'body': Node,
  'div': Node,
  'a': Node,
  'b': Node,
  'span': Node,
  'table': TableNode,
  'tr': Node,
  'td': Node,
  'template': Node,
  'picture': Node,
  'video': Node,
  'source': Node,
  'svg': Node,
  'path': Node,
  'main': Node,
  'nav': Node,
  'ul': Node,
  'li': Node,
  'img': ImgNode,
  'input': InputNode,
  'button': Node,
};
