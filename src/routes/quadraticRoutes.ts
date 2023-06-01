import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import generate from "../Generate/generate";
import { Quadratic } from "../Generate/CurveType";

const quadraticRoutes = Router();
const { OK, BAD_REQUEST } = StatusCodes;

const handler = (
  seed: string,
  widthStr: string,
  heightStr: string,
  numStr: string
): string | undefined => {
  const width = parseInt(widthStr);
  if (isNaN(width)) {
    return undefined;
  }
  const height = parseInt(heightStr);
  if (isNaN(height)) {
    return undefined;
  }
  const num = parseInt(numStr);
  if (isNaN(num)) {
    return undefined;
  }
  return generate({
    size: { width, height },
    curveType: Quadratic,
    numberOfPoints: num,
    seed,
  });
};

quadraticRoutes.get("/:width/:height/:num", (req, res) => {
  const { width, height, num } = req.params;
  const seedStr = req.query.seed;
  const seed = seedStr ? seedStr.toString() : Date.now().toString();
  const result = handler(seed, width, height, num);
  if (!result) {
    res.sendStatus(BAD_REQUEST);
    return;
  }
  res.set("Content-Type", "image/svg+xml").status(OK).send(result);
});
quadraticRoutes.get("/:size/:num", (req, res) => {
  const { size, num } = req.params;
  const seedStr = req.query.seed;
  const seed = seedStr ? seedStr.toString() : Date.now().toString();
  const result = handler(seed, size, size, num);
  if (!result) {
    res.sendStatus(BAD_REQUEST);
    return;
  }
  res.set("Content-Type", "image/svg+xml").status(OK).send(result);
});
export default quadraticRoutes;
