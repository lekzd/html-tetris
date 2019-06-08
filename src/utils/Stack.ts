import {shuffle} from './shuffle';

export class Stack<T> {

  private array: T[] = [];

  constructor(array: T[]){
    this.array = array.slice(0);
  }

  get current(): T {
     return this.array[0];
  }

  prev(): T {
    const prev = this.array.pop();

    if (prev === undefined) {
      throw Error('stack is empty');
    }

    this.array.unshift(prev);

    return prev;
  }

  set(items: T[]) {
    this.array = [...items];
  }

  next(): T {
    const next = this.array.shift();

    if (next === undefined) {
      throw Error('stack is empty');
    }

    this.array.push(next);

    return next;
  }

  slice(from: number, to?: number): T[] {
    return this.array.slice(from, to);
  }

  static randomized<T>(stack: T[]): Stack<T> {
    return new Stack(shuffle(stack))
  }
}
