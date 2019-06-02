import {color} from "./utils/color";

export const HEIGHT = 32;
export const WIDTH = 80;
export const CELL_HEIGHT = 25;
export const CELL_WIDTH = 15;

export const FONT = 'PT Mono, Monospaced, monospace';
export const FONT_WEIGHT = 600;

export const BACKGROUND_COLOR = color('#272822');
export const NUMBERS_COLOR = color('#899089');
export const PLAYER_COLOR = color('#FFFFFF');

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
  ACTION,
}
