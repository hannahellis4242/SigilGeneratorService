import seedrandom, { PRNG } from "seedrandom";
import Config from "./Config";
import Point from "../Curve/Point";
import Size from "./Size";
import { CubicType, QuadraticType } from "./CurveType";

const randBetween =
  (rng: PRNG) =>
  (min: number, max: number): number =>
    rng() * (max - min) + min;

const randPointWithin =
  (rng: PRNG) =>
  ({ width, height }: Size): Point => ({
    x: randBetween(rng)(0.4 * width, 0.6 * width),
    y: randBetween(rng)(0.4 * height, 0.6 * height),
  });

const randArrow =
  (rng: PRNG) =>
  (maxLength: number): Point => {
    const lenth = randBetween(rng)(0, maxLength);
    const angle = randBetween(rng)(0, 2 * Math.PI);
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
  const rng = seedrandom(seed);
  const randPoints = new Array(numberOfPoints)
    .fill(0)
    .map(() => randPointWithin(rng)(size));
  const maxGradLength = 0.1 * Math.min(size.width, size.height);
  switch (curveType) {
    case "quadratic":
      return {
        curve: "quadratic",
        points: randPoints,
        gradient: randArrow(rng)(maxGradLength),
      };
    case "cubic":
      return {
        curve: "cubic",
        points: randPoints.map((p) => [p, randArrow(rng)(maxGradLength)]),
      };
  }
};

export default getPoints;
