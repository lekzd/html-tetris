import {BaseNode} from './Node';
import {ImgNode} from "./ImgNode";
import {TableNode} from "./TableNode";
import {UlNode} from './UlNode';
import {VideoNode} from './VideoNode';
import {TrNode} from './TrNode';
import {PictureNode} from './PictureNode';
import {SourceNode} from './SourceNode';
import {SvgNode} from './SvgNode';
import {PathNode} from './PathNode';
import {AppBarNode} from './AppBarNode';
import {ButtonNode} from './ButtonNode';
import {TextFieldNode} from './TextFieldNode';
import {TypographyNode} from './TypographyNode';
import {IconNode} from './IconNode';

export const nodeTypes: {[key: string]: typeof BaseNode} = {
  'Container': BaseNode,
  'Grid': BaseNode,
  'Paper': BaseNode,
  'TextField': TextFieldNode,
  'Button': ButtonNode,
  'IconButton': BaseNode,
  'Toolbar': BaseNode,
  'AppBar': AppBarNode,
  'Tabs': BaseNode,
  'Tab': BaseNode,
  'Fab': BaseNode,
  'Icon': IconNode,
  'Checkbox': BaseNode,
  'RadioGroup': BaseNode,
  'FormControl': BaseNode,
  'Switch': BaseNode,
  'List': BaseNode,
  'ListItem': BaseNode,
  'Typography': TypographyNode,
};
