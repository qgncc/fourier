import { useMemo } from "react";

type Points = Array<[number, number]>;

export interface GraphProps {
  points: Points;
  width: number;
  height: number;
  unitInterval: number;
  scale?: number;
  graphColor?: string;
  axisColor?: string;
  strokeWidth?: number;
  center?: [number, number];
}

type Coords = [number, number];

export function Graph({
  unitInterval = 1,
  points,
  width,
  height,
  strokeWidth = 1,
  graphColor = "#ff0000",
  axisColor = "#312312",
  center = [width / 2, height / 2],
}: GraphProps) {
  const xViewBox = width;
  const yViewBox = height;

  const [centerX, centerY] = center;

  function centerCoordsToSVGCoords([x, y]: Coords): Coords {
    return [x + centerX, -y + centerY];
  }

  function createLine(points: Points) {
    let line = `M ${centerCoordsToSVGCoords([
      points[0][0] * unitInterval,
      points[0][1] * unitInterval,
    ]).join(" ")} `;

    for (let [x, y] of points) {
      let [SVGX, SVGY] = centerCoordsToSVGCoords([
        x * unitInterval,
        y * unitInterval,
      ]);
      line += `L ${SVGX} ${SVGY} `;
    }
    return line;
  }
  let axisXStart =
    centerX - strokeWidth < 0
      ? strokeWidth / 2
      : centerX + strokeWidth > width
      ? width - strokeWidth / 2
      : centerX;
  let axisYStart =
    centerY - strokeWidth < 0
      ? strokeWidth / 2
      : centerY + strokeWidth > width
      ? width - strokeWidth / 2
      : centerY;

  let unitMarksX =
    Array(Math.floor((width - centerX) / unitInterval))
      .fill(0)
      .map(
        (elem, i) =>
          `M ${centerX + unitInterval * (i + 1)} ${axisYStart - 4} L ${
            centerX + unitInterval * (i + 1)
          } ${axisYStart + 4} `
      )
      .join(" ") +
    " " +
    Array(Math.floor(centerX / unitInterval))
      .fill(0)
      .map(
        (elem, i) =>
          `M ${centerX - unitInterval * (i + 1)} ${axisYStart - 4} L ${
            centerX - unitInterval * (i + 1)
          } ${axisYStart + 4} `
      )
      .join(" ");
  let unitMarksY =
    Array(Math.floor((height - centerY) / unitInterval))
      .fill(0)
      .map(
        (elem, i) =>
          `M ${axisXStart - 4} ${centerY + unitInterval * (i + 1)} L ${
            axisXStart + 4
          } ${centerY + unitInterval * (i + 1)}`
      )
      .join(" ") +
    " " +
    Array(Math.floor(centerY / unitInterval))
      .fill(0)
      .map(
        (elem, i) =>
          `M ${axisXStart - 4} ${centerY - unitInterval * (i + 1)} L ${
            axisXStart + 4
          } ${centerY - unitInterval * (i + 1)}`
      )
      .join(" ");
  let line = useMemo(() => createLine(points), [points]);
  return (
    <svg
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      strokeLinecap={"round"}
    >
      <path
        d={`M ${axisXStart} 0 L ${axisXStart} ${yViewBox}`}
        fill="transparent"
        stroke={axisColor}
      />
      <path
        d={`M 0 ${axisYStart} L ${xViewBox} ${axisYStart}`}
        fill="transparent"
        stroke={axisColor}
      />
      <path d={line} fill="transparent" stroke={graphColor} />
      {/* UNIT MARKS */}
      <path
        d={unitMarksX}
        fill="transparent"
        strokeWidth={3}
        stroke={axisColor}
      />
      <path
        d={unitMarksY}
        fill="transparent"
        strokeWidth={3}
        stroke={axisColor}
      />
      {/* END OF UNIT MARKS */}
    </svg>
  );
}
