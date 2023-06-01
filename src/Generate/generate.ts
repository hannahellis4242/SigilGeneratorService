import cubic from "../Curve/cubic";
import draw from "../Curve/draw";
import quadratic from "../Curve/quadratic";
import Config from "./Config";
import Size from "./Size";
import getPoints from "./getPoints";

const drawCurve =
  ({ width, height }: Size) =>
  (generator: () => string) =>
    draw({
      width,
      height,
      stroke: "black",
      fill: "transparent",
      thickness: 1,
      generator,
    });

const generate = (config: Config): string => {
  const generatedPoints = getPoints(config);
  const drawCurveWithSize = drawCurve(config.size);
  switch (generatedPoints.curve) {
    case "quadratic": {
      const { points, gradient } = generatedPoints;
      return drawCurveWithSize(() => quadratic(points, gradient));
    }
    case "cubic": {
      const { points } = generatedPoints;
      return drawCurveWithSize(() => cubic(points));
    }
  }
};
export default generate;
