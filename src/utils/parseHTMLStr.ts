import {SymbolType} from "../entities/SymbolType";

export const parseHTMLStr = (tag: string, callback: (type: SymbolType, letter: string, index: number) => void) => {
  let current = SymbolType.UNKNOWN;
  let last = '';
  let parenties = false;

  [...tag].forEach((symbol, index) => {
    if (parenties) {
      current = SymbolType.VALUE;
    }

    if (symbol === '"') {
      if (parenties) {
        callback(current, symbol, index);
        current = SymbolType.UNKNOWN;
        parenties = false;
        return;
      } else {
        current = SymbolType.VALUE;
        parenties = true;
      }
    }

    if (current !== SymbolType.CONST && symbol === '<') {
      current = SymbolType.CONST;
    }

    if (current === SymbolType.CONST && (last === '<' || last === '/')) {
      current = SymbolType.TAG;
    }

    if (symbol === '/') {
      current = SymbolType.CONST;
    }

    if (current !== SymbolType.CONST && symbol === '>') {
      current = SymbolType.CONST;
    }

    if (current === SymbolType.TAG && symbol === ' ') {
      current = SymbolType.UNKNOWN;
    }

    if (current === SymbolType.UNKNOWN && last === ' ' && symbol !== ' ') {
      current = SymbolType.ATTR;
    }

    if (current === SymbolType.ATTR && symbol === '=') {
      current = SymbolType.EQUAl;
    }

    callback(current, symbol, index);

    last = symbol;
  });
};
