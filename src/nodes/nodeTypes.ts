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
  'Container': Node,
  'Grid': Node,
  'Paper': Node,
  'TextField': Node,
  'Button': Node,
  'IconButton': Node,
  'Toolbar': Node,
  'AppBar': Node,
  'Tabs': Node,
  'Tab': Node,
  'Fab': Node,
  'Icon': Node,
  'Checkbox': Node,
  'RadioGroup': Node,
  'FormControl': Node,
  'Switch': Node,
  'List': Node,
  'ListItem': Node,
  'Typography': Node,
};
