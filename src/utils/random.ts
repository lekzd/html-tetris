export function random(min: number, max: number): number {
  return Math.round(min + (Math.random() * (max - min)));
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.round(random(0, array.length - 1))];
}
