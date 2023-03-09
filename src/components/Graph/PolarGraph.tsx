import { useMemo } from "react";
import { Graph, GraphProps } from "./Graph";

type MathPolarFunction = (rad: number) => number;

interface PolarGraphProps extends Omit<GraphProps, "points"> {
  fn: MathPolarFunction;
  detailLevel?: number;
  frequency?: number;
  period?: [number, number]; // [from, to]
}

export function PolarGraph(props: PolarGraphProps) {
  const PI = Math.PI;

  const {
    fn,
    unitInterval = 1,
    detailLevel = 1,
    period = [0, 2 * PI],
    frequency = 1,
    center,
    width,
    height,
    ...rest
  } = props;
  const [centerX, centerY] = center ? center : [width / 2, height / 2];
  function calcPoints(fn: MathPolarFunction) {
    let points: Array<[number, number]> = [];
    for (let fi = period[0]; fi < period[1]; fi += 1 / detailLevel) {
      points.push([
        fn(fi) * Math.cos(fi * frequency),
        fn(fi) * Math.sin(fi * frequency),
      ]);
    }
    return points;
  }
  const points = useMemo(() => calcPoints(fn), [fn]);

  return (
    <Graph
      unitInterval={unitInterval}
      width={width}
      height={height}
      points={points}
      center={center}
      {...rest}
    />
  );
}
