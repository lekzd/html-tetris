import {SymbolType} from "./entities/SymbolType";
import {color} from "./utils/color";
import commonShader from './shaders/common.frag';
import redShader from './shaders/red.frag';
import pulseShader from './shaders/pulse.frag';
import joinRoomWaveShader from './shaders/joinRoomWave.frag';
import syntWaveAffectedShader from './shaders/syntWaveAffected.frag';

export const TERMINAL_THEME = {
  background: color('#0e1111'),
  backgroundText: color('#6b8092'),
  foreground: color('#4c566a'),
  tab: color('#3b4251'),
  accent: color('#63add0'),
  foregroundText: color('#dbd6c5'),
};

export const JOIN_ROOM_THEME = {
  name: 'Hello',
  finalShader: joinRoomWaveShader,
  affectedShader: commonShader,
  [SymbolType.BACKGROUND]: color('#313131'),
  [SymbolType.NUMBERS_BG]: color('#313131'),
  [SymbolType.HIGHLIGHT]: color('#3e3e3e'),
  [SymbolType.UNKNOWN]: color('#ffffff'),
  [SymbolType.CONST]: color('#ffffff'),
  [SymbolType.TAG]: color('#ffffff'),
  [SymbolType.VALUE]: color('#ffffff'),
  [SymbolType.EQUAl]: color('#ffffff'),
  [SymbolType.ATTR]: color('#ffffff'),
};

export const COLOR_STYLES = {
  Monokai: {
    name: 'Monokai',
    finalShader: commonShader,
    affectedShader: pulseShader,
    [SymbolType.BACKGROUND]: color('#272822'),
    [SymbolType.NUMBERS_BG]: color('#33352c'),
    [SymbolType.HIGHLIGHT]: color('#1e1d1e'),
    [SymbolType.UNKNOWN]: color('#FFFFFF'),
    [SymbolType.CONST]: color('#f1efe2'),
    [SymbolType.TAG]: color('#dd2568'),
    [SymbolType.VALUE]: color('#c4af4f'),
    [SymbolType.EQUAl]: color('#d4d3be'),
    [SymbolType.ATTR]: color('#9abd06'),
  },
  Far: {
    name: 'Far',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#000080'),
    [SymbolType.NUMBERS_BG]: color('#000080'),
    [SymbolType.HIGHLIGHT]: color('#00043f'),
    [SymbolType.UNKNOWN]: color('#FFFFFF'),
    [SymbolType.CONST]: color('#00ffff'),
    [SymbolType.TAG]: color('#FFFFFF'),
    [SymbolType.VALUE]: color('#ffff00'),
    [SymbolType.EQUAl]: color('#00ffff'),
    [SymbolType.ATTR]: color('#00ffff'),
  },
  Gruvbox: {
    name: 'Gruvbox Dark',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#282828'),
    [SymbolType.NUMBERS_BG]: color('#3c3836'),
    [SymbolType.HIGHLIGHT]: color('#1d2021'),
    [SymbolType.UNKNOWN]: color('#928374'),
    [SymbolType.CONST]: color('#8ec07c'),
    [SymbolType.TAG]: color('#83a598'),
    [SymbolType.VALUE]: color('#b8bb26'),
    [SymbolType.EQUAl]: color('#8ec07c'),
    [SymbolType.ATTR]: color('#fabd2f'),
  },
  Synthwave: {
    name: 'SynthWave \'84',
    finalShader: commonShader,
    affectedShader: syntWaveAffectedShader,
    [SymbolType.BACKGROUND]: color('#2b213a'),
    [SymbolType.NUMBERS_BG]: color('#2b213a'),
    [SymbolType.HIGHLIGHT]: color('#241b30'),
    [SymbolType.UNKNOWN]: color('#596295'),
    [SymbolType.CONST]: color('#bfb6a9'),
    [SymbolType.TAG]: color('#e1299f'),
    [SymbolType.VALUE]: color('#d47d40'),
    [SymbolType.EQUAl]: color('#e0e3e6'),
    [SymbolType.ATTR]: color('#e0e3e6'),
  },
  Lightfair: {
    name: 'Lightfair',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#550000'),
    [SymbolType.NUMBERS_BG]: color('#652d2c'),
    [SymbolType.HIGHLIGHT]: color('#340000'),
    [SymbolType.UNKNOWN]: color('#4b4435'),
    [SymbolType.CONST]: color('#778885'),
    [SymbolType.TAG]: color('#1ca3a3'),
    [SymbolType.VALUE]: color('#4286f4'),
    [SymbolType.EQUAl]: color('#778899'),
    [SymbolType.ATTR]: color('#778899'),
  },
  Nord: {
    name: 'Nord',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#2e3440'),
    [SymbolType.NUMBERS_BG]: color('#3b4252'),
    [SymbolType.HIGHLIGHT]: color('#22262f'),
    [SymbolType.UNKNOWN]: color('#b7dede'),
    [SymbolType.CONST]: color('#81a1b9'),
    [SymbolType.TAG]: color('#4e89c1'),
    [SymbolType.VALUE]: color('#98be8c'),
    [SymbolType.EQUAl]: color('#82bcbb'),
    [SymbolType.ATTR]: color('#82bcbb'),
  },
  Qtcreator: {
    name: 'Qtcreator',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#000000'),
    [SymbolType.NUMBERS_BG]: color('#000000'),
    [SymbolType.HIGHLIGHT]: color('#1d1d1d'),
    [SymbolType.UNKNOWN]: color('#aaaaaa'),
    [SymbolType.CONST]: color('#84aa9a'),
    [SymbolType.TAG]: color('#ffff55'),
    [SymbolType.VALUE]: color('#ef55ff'),
    [SymbolType.EQUAl]: color('#aaaaaa'),
    [SymbolType.ATTR]: color('#aaaaaa'),
  },
  Solarized: {
    name: 'Solarized',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#002b36'),
    [SymbolType.NUMBERS_BG]: color('#003948'),
    [SymbolType.HIGHLIGHT]: color('#001c23'),
    [SymbolType.UNKNOWN]: color('#61948a'),
    [SymbolType.CONST]: color('#83948a'),
    [SymbolType.TAG]: color('#1b7fa5'),
    [SymbolType.VALUE]: color('#1ea17f'),
    [SymbolType.EQUAl]: color('#839496'),
    [SymbolType.ATTR]: color('#b58900'),
  },
  XT256: {
    name: 'XT 256',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#000000'),
    [SymbolType.NUMBERS_BG]: color('#000000'),
    [SymbolType.HIGHLIGHT]: color('#1d1d1d'),
    [SymbolType.UNKNOWN]: color('#eaeaea'),
    [SymbolType.CONST]: color('#000fff'),
    [SymbolType.TAG]: color('#ff0000'),
    [SymbolType.VALUE]: color('#00ff00'),
    [SymbolType.EQUAl]: color('#000fff'),
    [SymbolType.ATTR]: color('#000fff'),
  },
  Github: {
    name: 'Github',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#f8f8f8'),
    [SymbolType.NUMBERS_BG]: color('#f8f8f8'),
    [SymbolType.HIGHLIGHT]: color('#a4a4a4'),
    [SymbolType.UNKNOWN]: color('#333333'),
    [SymbolType.CONST]: color('#000fff'),
    [SymbolType.TAG]: color('#000080'),
    [SymbolType.VALUE]: color('#df1190'),
    [SymbolType.EQUAl]: color('#000080'),
    [SymbolType.ATTR]: color('#008080'),
  },
  Dracula: {
    name: 'Dracula',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#282a36'),
    [SymbolType.NUMBERS_BG]: color('#313342'),
    [SymbolType.HIGHLIGHT]: color('#181921'),
    [SymbolType.UNKNOWN]: color('#d7f8e6'),
    [SymbolType.CONST]: color('#f8f8d4'),
    [SymbolType.TAG]: color('#f1ed81'),
    [SymbolType.VALUE]: color('#e4fa8c'),
    [SymbolType.EQUAl]: color('#f8f8f2'),
    [SymbolType.ATTR]: color('#f8f8f2'),
  },
  GardenOfEden: {
    name: 'Garden Of Eden',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#005050'),
    [SymbolType.NUMBERS_BG]: color('#005050'),
    [SymbolType.HIGHLIGHT]: color('#003535'),
    [SymbolType.UNKNOWN]: color('#e1e2dc'),
    [SymbolType.CONST]: color('#5faeb4'),
    [SymbolType.TAG]: color('#00c8c7'),
    [SymbolType.VALUE]: color('#00cb27'),
    [SymbolType.EQUAl]: color('#5faeb4'),
    [SymbolType.ATTR]: color('#00c1c5'),
  },
  Matrix: {
    name: 'Matrix',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#000000'),
    [SymbolType.NUMBERS_BG]: color('#000000'),
    [SymbolType.HIGHLIGHT]: color('#123212'),
    [SymbolType.UNKNOWN]: color('#22571c'),
    [SymbolType.CONST]: color('#3fc554'),
    [SymbolType.TAG]: color('#3fc554'),
    [SymbolType.VALUE]: color('#3fc554'),
    [SymbolType.EQUAl]: color('#acd832'),
    [SymbolType.ATTR]: color('#acd832'),
  },
  Strawberry: {
    name: 'Strawberry',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#ffebf0'),
    [SymbolType.NUMBERS_BG]: color('#e0c5cc'),
    [SymbolType.HIGHLIGHT]: color('#d46a84'),
    [SymbolType.UNKNOWN]: color('#6b4851'),
    [SymbolType.CONST]: color('#d97a91'),
    [SymbolType.TAG]: color('#f55050'),
    [SymbolType.VALUE]: color('#219e21'),
    [SymbolType.EQUAl]: color('#e06a26'),
    [SymbolType.ATTR]: color('#e06a26'),
  },
  ColorsOff: {
    name: 'Colors Off',
    finalShader: commonShader,
    affectedShader: commonShader,
    [SymbolType.BACKGROUND]: color('#313131'),
    [SymbolType.NUMBERS_BG]: color('#313131'),
    [SymbolType.HIGHLIGHT]: color('#3e3e3e'),
    [SymbolType.UNKNOWN]: color('#6f6962'),
    [SymbolType.CONST]: color('#b4b2b2'),
    [SymbolType.TAG]: color('#b4b2b2'),
    [SymbolType.VALUE]: color('#b4b2b2'),
    [SymbolType.EQUAl]: color('#b4b2b2'),
    [SymbolType.ATTR]: color('#b4b2b2'),
  }
};
