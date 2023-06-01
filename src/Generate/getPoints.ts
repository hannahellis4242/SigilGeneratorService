import Config from "./Config";
import Point from "../Curve/Point";
import { CubicType, QuadraticType } from "./CurveType";
import { Engine, real, MersenneTwister19937 } from "random-js";
import stringToSeedArray from "../utils/stringToSeedArray";

const randPointWithin =
  (randX: (rng: Engine) => number, randY: (rng: Engine) => number) =>
  (rng: Engine): Point => ({
    x: randX(rng),
    y: randY(rng),
  });

const randAngle = real(0, 2 * Math.PI, false);

const randArrow =
  (randLength: (rng: Engine) => number) =>
  (rng: Engine): Point => {
    const lenth = randLength(rng);
    const angle = randAngle(rng);
    return { x: lenth * Math.cos(angle), y: lenth * Math.sin(angle) };
  };

export interface QuadraticPoints {
  curve: QuadraticType;
  points: Point[];
  gradient: Point;
}

export interface CubicPoints {
  curve: CubicType;
  points: [Point, Point][];
}

export type CurvePoints = QuadraticPoints | CubicPoints;

const getPoints = ({
  size,
  curveType,
  numberOfPoints,
  seed,
}: Config): CurvePoints => {
  const rng = MersenneTwister19937.seedWithArray(stringToSeedArray(seed));
  const { width, height } = size;
  const randX = real(0.4 * width, 0.6 * width, true);
  const randY = real(0.4 * height, 0.6 * height, true);
  const randPoint = randPointWithin(randX, randY);
  const randPoints = new Array(numberOfPoints)
    .fill(0)
    .map(() => randPoint(rng));
  const maxGradLength = 0.1 * Math.min(size.width, size.height);
  const randLength = real(0, maxGradLength, true);
  const arrow = randArrow(randLength);
  switch (curveType) {
    case "quadratic":
      return {
        curve: "quadratic",
        points: randPoints,
        gradient: arrow(rng),
      };
    case "cubic":
      return {
        curve: "cubic",
        points: randPoints.map((p) => [p, arrow(rng)]),
      };
  }
};

export default getPoints;
