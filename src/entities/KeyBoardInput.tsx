import { Command} from "../constants";
import {fromEvent, merge, Subject} from "rxjs";
import {filter, map, takeUntil, tap} from "rxjs/operators";
import keycode from "keycode";

const KeyCommandMap: {[key: string]: Command} = {
  w: Command.TOP,
  up: Command.TOP,
  a: Command.LEFT,
  left: Command.LEFT,
  s: Command.BOTTOM,
  down: Command.BOTTOM,
  d: Command.RIGHT,
  right: Command.RIGHT,
  enter: Command.ACTION,
};

const KeyShiftCommandMap: {[key: string]: Command} = {
  w: Command.SHIFT_TOP,
  up: Command.SHIFT_TOP,
  a: Command.SHIFT_LEFT,
  left: Command.SHIFT_LEFT,
  s: Command.SHIFT_BOTTOM,
  down: Command.SHIFT_BOTTOM,
  d: Command.SHIFT_RIGHT,
  right: Command.SHIFT_RIGHT,
};

export class KeyBoardInput extends Subject<Command> {

  private unmount$ = new Subject();

  constructor() {
    super();

    const keypress$ = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        takeUntil(this.unmount$)
      );

    const keypressNoShift$ = keypress$
      .pipe(
        filter(e => !e.shiftKey),
        map(e => keycode(e)),
        tap(console.log),
        filter(e => Object.keys(KeyCommandMap).includes(e)),
        map(e => KeyCommandMap[e])
      );

    const keypressShift$ = keypress$
      .pipe(
        filter(e => e.shiftKey),
        map(e => keycode(e)),
        filter(e => Object.keys(KeyShiftCommandMap).includes(e)),
        map(e => KeyShiftCommandMap[e])
      );

    merge(keypressShift$, keypressNoShift$).subscribe(command => {
      this.next(command);
    });
  }
}
