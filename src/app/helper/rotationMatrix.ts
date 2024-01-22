import { defaultAxis } from "../defaults/defaults";
import { Axis, Dimension, Point_Set, Rotate_Set } from "../types/types";

export const sortRotationMatrix = (a: Rotate_Set, b: Rotate_Set) => {
  const a0AxisId = defaultAxis.findIndex((dA) => dA === a.axis[0]);
  const b0AxisId = defaultAxis.findIndex((dA) => dA === b.axis[0]);
  if (a0AxisId > b0AxisId) return -1;
  if (a0AxisId < b0AxisId) return 1;
  const a1AxisId = defaultAxis.findIndex((dA) => dA === a.axis[1]);
  const b1AxisId = defaultAxis.findIndex((dA) => dA === b.axis[1]);
  if (a1AxisId > b1AxisId) return -1;
  if (a1AxisId < b1AxisId) return 1;
  return 0
}



export function rotation(dimension: Dimension, [rotateAxis_a, rotateAxis_b]: Axis[], prePoints: Point_Set[], angle: number): Point_Set[] {
  const dimensionLevel = parseInt(dimension[0]);
  if (
    !(defaultAxis.findIndex((axis) => axis === rotateAxis_a) < dimensionLevel)
    ||
    !(defaultAxis.findIndex((axis) => axis === rotateAxis_b) < dimensionLevel)
    ||
    rotateAxis_a === rotateAxis_b
  ) {
    console.log("rotate axis not in {dimension}")
    return prePoints;
  }
  const rotationMatrix =
    Array(dimensionLevel)
      .fill(
        Array(dimensionLevel).fill(0)
      )
      .map((line: number[], yId) => {
        return line.map((_a, xId): (0 | 1 | ((alpha: number) => number)) => {
          // return line.map((_a, xId): number | string => {
          if (
            (xId === defaultAxis.findIndex((axis) => axis === rotateAxis_a))
            &&
            (yId === defaultAxis.findIndex((axis) => axis === rotateAxis_a))
          ) {
            return (alpha) => Math.cos(alpha)
            // return "cos";
          } else if (
            (xId === defaultAxis.findIndex((axis) => axis === rotateAxis_b))
            &&
            (yId === defaultAxis.findIndex((axis) => axis === rotateAxis_a))
          ) {
            return (alpha) => -1 * Math.sin(alpha)
            // return "-sin";
          } else if (
            (xId === defaultAxis.findIndex((axis) => axis === rotateAxis_a))
            &&
            (yId === defaultAxis.findIndex((axis) => axis === rotateAxis_b))
          ) {
            return (alpha) => Math.sin(alpha)
            // return "sin";
          } else if (
            (xId === defaultAxis.findIndex((axis) => axis === rotateAxis_b))
            &&
            (yId === defaultAxis.findIndex((axis) => axis === rotateAxis_b))
          ) {
            return (alpha) => Math.cos(alpha)
            // return "cos";
          } else if (xId === yId) {
            return 1
          }
          return 0
        })
      });
  const rotationPoints =
    prePoints
      .map(
        (point) => {
          return rotationMatrix
            .map(
              (line: (0 | 1 | ((alpha: number) => number))[], key) => {
                return {
                  axis: defaultAxis[key],
                  value: line
                    .reduce(
                      (acc: number, matrixValueCell, index): number => {
                        return acc +
                          (
                            (matrixValueCell === 0 || matrixValueCell === 1)
                              ?
                              matrixValueCell
                              :
                              matrixValueCell(angle / 180 * Math.PI)
                          )
                          * point[defaultAxis[index]];
                      },
                      0
                    )
                }
              }
            )
            .reduce<Point_Set>(
              (acc, curr) => (acc[curr.axis] = curr.value, acc), { x: 0, y: 0 }
            )
        }
      )
  return rotationPoints;
}