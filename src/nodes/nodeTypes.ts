import {Node} from './Node';
import {InputNode} from "./InputNode";
import {ImgNode} from "./ImgNode";
import {TableNode} from "./TableNode";
import {UlNode} from './UlNode';
import {VideoNode} from './VideoNode';
import {TrNode} from './TrNode';
import {PictureNode} from './PictureNode';
import {SourceNode} from './SourceNode';
import {SvgNode} from './SvgNode';
import {PathNode} from './PathNode';

export const nodeTypes: {[key: string]: typeof Node} = {
  'body': Node,
  'div': Node,
  'a': Node,
  'b': Node,
  'span': Node,
  'table': TableNode,
  'tr': TrNode,
  'td': Node,
  'template': Node,
  'picture': PictureNode,
  'video': VideoNode,
  'source': SourceNode,
  'svg': SvgNode,
  'path': PathNode,
  'main': Node,
  'nav': Node,
  'ul': UlNode,
  'li': Node,
  'img': ImgNode,
  'input': InputNode,
  'button': Node,
};
