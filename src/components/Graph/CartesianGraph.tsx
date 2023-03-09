import { useMemo } from "react";
import { Graph, GraphProps } from "./Graph";

type MathFunction = (x: number) => number;

interface CartesianGraphProps extends Omit<GraphProps, "points"> {
  fn: MathFunction;
  detailLevel?: number;
}

export function CartesianGraph(props: CartesianGraphProps) {
  const {
    fn,
    unitInterval = 1,
    detailLevel = 1,
    center,
    width,
    height,
    ...rest
  } = props;
  const [centerX, centerY] = center ? center : [width / 2, height / 2];
  const startX = (0 - centerX) / unitInterval;
  const endX = (width - centerX) / unitInterval;
  function calcPoints(fn: MathFunction) {
    let points: Array<[number, number]> = [];
    for (let x = startX; x < endX; x += 1 / detailLevel) {
      points.push([x, fn(x)]);
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
