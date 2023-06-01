export default interface Point {
  x: number;
  y: number;
}

export const point = (x: number, y: number): Point => ({ x, y });
export const subtract = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
});
export const add = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
});
