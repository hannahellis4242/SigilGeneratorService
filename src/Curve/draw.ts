interface Drawing {
  width: number;
  height: number;
  stroke: string;
  fill: string;
  thickness: number;
  generator(): string;
}
const draw = ({ width, height, stroke, fill, thickness, generator }: Drawing) =>
  `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}">
<path d="${generator()}" stroke="${stroke}" fill="${fill}" stroke-width="${thickness}"/>
</svg>`;
export default draw;
