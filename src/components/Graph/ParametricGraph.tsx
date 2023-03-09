import { useMemo } from "react";
import { Graph, GraphProps } from "./Graph";

type MathFunction = (t: number) => number;

interface ParametricGraphProps extends Omit<GraphProps, "points"> {
  fnX: MathFunction;
  fnY: MathFunction;
  detailLevel?: number;
  period?: [number, number];
}

export function ParametricGraph(props: ParametricGraphProps) {
  const {
    fnX,
    fnY,
    period = [0, 10],
    unitInterval = 1,
    detailLevel = 1,
    center,
    width,
    height,
    ...rest
  } = props;
  const [centerX, centerY] = center ? center : [width / 2, height / 2];
  const startX = period[0] * unitInterval;
  const endX = period[1] * unitInterval;
  function calcPoints(fnX: MathFunction, fnY: MathFunction) {
    let points: Array<[number, number]> = [];
    for (let t = startX; t < endX; t += 1 / detailLevel) {
      points.push([fnX(t), fnY(t)]);
    }
    return points;
  }
  const points = useMemo(() => calcPoints(fnX, fnY), [fnX, fnY]);

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
