import CurveType from "./CurveType";
import Size from "./Size";

export default interface Config {
  size: Size;
  curveType: CurveType;
  numberOfPoints: number;
  seed: string;
}
