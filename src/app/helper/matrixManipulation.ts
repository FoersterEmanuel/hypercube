import { ConstructionOutlined } from "@mui/icons-material";
import { defaultAxis, defaultDimension, getDimension, MatrixToVector, VectorToMatrix } from "../defaults/defaults";
import { Dimension, Point_Set, Point_2D, Axis } from "../types/types";

export function matrixMultiplication(matrix: (0 | 1 | ((a: number) => number))[][], vectorMatrix: number[], helper: number): number[] {
  if (
    isNaN(vectorMatrix[0])
    ||
    matrix[0].length !== vectorMatrix.length
  )
    return [0];

  return matrix
    .map(
      (line: (0 | 1 | ((a: number) => number))[]) => line
        .reduce(
          (acc: number, curr: 0 | 1 | ((a: number) => number), index): number => acc +
            ((curr === 1 || curr === 0) ? curr : curr(helper))
            * vectorMatrix[index],
          0
        )
    )
}

export function createProjectionMatrix(dimensionLevel: number, perspectiveDistance: number): (0 | 1 | ((a: number) => number))[][] {
  const perspectiveValue = (value: number): number => 1 / (perspectiveDistance - value);
  return Array(dimensionLevel - 1)
    .fill(Array(dimensionLevel).fill(0))
    .map<(0 | 1 | ((a: number) => number))[]>(
      (yValue: number[], yKey: number) =>
        yValue.map<0 | 1 | ((a: number) => number)>(
          (_xValue: number, xKey: number): (0 | 1 | ((a: number) => number)) =>
            (xKey === yKey) ? perspectiveValue : 0
        )
    );
}
