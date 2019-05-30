import {SymbolType} from "./entities/SymbolType";
import {color} from "./utils/color";

export const HEIGHT = 32;
export const WIDTH = 53;
export const CELL_HEIGHT = 25;
export const CELL_WIDTH = 15;

export const BACKGROUND_COLOR = color('#272822');
export const HIGHLIGHT_COLOR = color('#1e1d1e');
export const NUMBERS_COLOR = color('#899089');
export const PLAYER_COLOR = color('#FFFFFF');

export const COLOR_MAP = {
  [SymbolType.UNKNOWN]: color('#FFFFFF'),
  [SymbolType.CONST]: color('#f1efe2'),
  [SymbolType.TAG]: color('#dd2568'),
  [SymbolType.VALUE]: color('#c4af4f'),
  [SymbolType.EQUAl]: color('#d4d3be'),
  [SymbolType.ATTR]: color('#9abd06'),
};

export const RANDOM_TAGS = [
  'div',
  'a',
  'b',
  'span',
  'table',
  'tr',
  'td',
  'template',
  'picture',
  'video',
  'source',
  'svg',
  'path',
  'main',
  'nav',
  'ul',
  'li',
  'img',
  'input',
  'button',
];

export const RANDOM_ATTRS = [
  'class',
  'title',
  'id',
  'href',
  'onclick',
  'name',
  'type',
  'role',
  'width',
  'height',
  'style',
  'aria-label',
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
