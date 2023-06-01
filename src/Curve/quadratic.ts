import Point, { add } from "./Point";

const quadratic = (points: Point[], initGradient: Point): string => {
  if (points.length < 2) {
    return "";
  }
  const [first, second, ...rest] = points;
  const control = add(first, initGradient);
  return (
    `M ${first.x} ${first.y} Q ${control.x} ${control.y} ${second.x} ${second.y} ` +
    rest.map(({ x, y }) => `T ${x} ${y}`).join(" ")
  );
};

export default quadratic;
