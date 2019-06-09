import {color} from "./utils/color";
import {BehaviorSubject} from 'rxjs/index';

export const HEIGHT = 32;
export const WIDTH = 80;
export const CELL_HEIGHT = 25;
export const CELL_WIDTH = 15;

export const FONT = 'PT Mono, Monospaced, monospace';
export const FONT_WEIGHT = 500;

export const NUMBERS_COLOR = color('#899089');
export const PLAYER_COLOR = color('#FFFFFF');

export const RANDOM_TAGS = [
  'Container',
  'Grid',
  'Paper',
  'TextField',
  'Button',
  'IconButton',
  'Toolbar',
  'AppBar',
  'Tabs',
  'Tab',
  'Fab',
  'Icon',
  'Checkbox',
  'RadioGroup',
  'FormControl',
  'Switch',
  'List',
  'ListItem',
  'Typography',
];

export const RANDOM_ATTRS = [
  'class',
  'color',
  'variant',
  'spacing',
  'justify',
  'label',
  'container',
  'item',
  'xs',
  'direction',
  'alignItems',
  'aria-label',
];

export const RANDOM_TEXTS: string[] = [
  ...RANDOM_TAGS,
  ...RANDOM_ATTRS,
  ...RANDOM_ATTRS,
];

export enum Command {
  LEFT,
  SHIFT_LEFT,
  TOP,
  SHIFT_TOP,
  RIGHT,
  SHIFT_RIGHT,
  BOTTOM,
  SHIFT_BOTTOM,
  IDLE,
  ACTION,
}

export const gameScrollState$ = new BehaviorSubject({leftOffset: 0, topOffset: 0});
