import Point, { add, subtract } from "./Point";

const cubic = (points: [Point, Point][]): string => {
  if (points.length < 2) {
    return "";
  }
  const [first, second, ...rest] = points;
  const [p0, g0] = first;
  const [p1, g1] = second;
  const q0 = add(p0, g0);
  const q1 = subtract(p1, g1);
  return (
    `M ${p0.x} ${p0.y} C ${q0.x} ${q0.y} ${q1.x} ${q1.y} ${p1.x} ${p1.y} ` +
    rest
      .map(([p, g]) => {
        const q = subtract(p, g);
        return `S ${q.x} ${q.y} ${p.x} ${p.y}`;
      })
      .join(" ")
  );
};

export default cubic;
