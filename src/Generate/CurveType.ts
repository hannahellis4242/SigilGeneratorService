export const Quadratic = "quadratic";
export type QuadraticType = typeof Quadratic;
export const Cubic = "cubic";
export type CubicType = typeof Cubic;
type CurveType = QuadraticType | CubicType;
export default CurveType;
