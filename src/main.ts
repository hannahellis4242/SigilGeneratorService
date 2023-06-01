import express, { query } from "express";
import { StatusCodes } from "http-status-codes";
import generate from "./Generate/generate";
import CurveType, { Cubic, Quadratic } from "./Generate/CurveType";

const app = express();

const { OK, BAD_REQUEST } = StatusCodes;

const getCurve = (s: string): CurveType | undefined => {
  switch (s) {
    case Cubic:
      return Cubic;
    case Quadratic:
      return Quadratic;
    default:
      return undefined;
  }
};

app.get("/", (req, res) => {
  const { seed, curve, points, width, height } = req.query;
  if (!seed) {
    res.status(BAD_REQUEST).send("no seed given");
    return;
  }
  if (!curve) {
    res.status(BAD_REQUEST).send("no curve given, can be cubic or quadratic");
    return;
  }
  if (!points) {
    res
      .status(BAD_REQUEST)
      .send(
        "no points parameter given, this is the number of points to generate"
      );
    return;
  }
  const pointsValue = parseInt(points.toString());
  if (isNaN(pointsValue)) {
    res.status(BAD_REQUEST).send("points should be a number");
    return;
  }
  if (pointsValue < 2) {
    res.status(BAD_REQUEST).send("points should be at least 2");
    return;
  }
  if (!width) {
    res.status(BAD_REQUEST).send("no width given");
    return;
  }
  const widthValue = parseInt(width.toString());
  if (isNaN(widthValue)) {
    res.status(BAD_REQUEST).send("width should be a number");
    return;
  }
  if (!height) {
    res.status(BAD_REQUEST).send("no height given");
    return;
  }
  const heightValue = parseInt(height.toString());
  if (isNaN(heightValue)) {
    res.status(BAD_REQUEST).send("height should be a number");
    return;
  }
  const curveType = getCurve(curve.toString());
  if (!curveType) {
    res.status(BAD_REQUEST).send("curve should be etiher cubic or quadratic");
    return;
  }
  res
    .set("Content-Type", "image/svg+xml")
    .status(OK)
    .send(
      generate({
        size: { width: widthValue, height: heightValue },
        curveType,
        numberOfPoints: pointsValue,
        seed: seed.toString(),
      })
    );
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
