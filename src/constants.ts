import {SymbolType} from "./entities/SymbolType";
import {color} from "./utils/color";

export const HEIGHT = 32;
export const WIDTH = 53;
export const CELL_HEIGHT = 25;
export const CELL_WIDTH = 15;

export const COLOR_MAP = {
  [SymbolType.UNKNOWN]: color('#FFFFFF'),
  [SymbolType.CONST]: color('#adadad'),
  [SymbolType.TAG]: color('#df426d'),
  [SymbolType.VALUE]: color('#f0ff61'),
  [SymbolType.EQUAl]: color('#f8ff7d'),
  [SymbolType.ATTR]: color('#72ff56'),
};

export const RANDOM_TAGS = [
  'div',
  'a',
  'b',
  'span',
  'table',
  'template',
  'svg',
  'path',
  'main',
  'nav',
  'ul',
  'li',
  'img',
];

export const RANDOM_ATTRS = [
  'class',
  'title',
  'id',
  'href',
  'onclick',
  'name',
  'role',
];

export const RANDOM_TEXTS = [
  ...RANDOM_TAGS,
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
}
