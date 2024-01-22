import { defaultAxis, getDimension, MatrixToVector, VectorToMatrix } from "../defaults/defaults";
import { Point_2D, Point_Set } from "../types/types";
import { createProjectionMatrix, matrixMultiplication } from "./matrixManipulation";

export function doProjection(prePoints: Point_Set[], perspectiveDistance: number, useHelper = true): Point_2D[] {
  const dimensionLevel = getDimension(prePoints[0]);
  //Dimesion is 2D
  if (dimensionLevel === 2)
    return prePoints;


  const projectionsMatrix: (0 | 1 | ((a: number) => number))[][] = createProjectionMatrix(dimensionLevel, perspectiveDistance);
  const projectionPoint =
    prePoints
      .map(
        (point) =>
          MatrixToVector(
            matrixMultiplication(
              projectionsMatrix,
              VectorToMatrix(point),
              (useHelper) ? point[defaultAxis[dimensionLevel - 1]] : perspectiveDistance - 1
            )
          )
      )

  if (dimensionLevel - 1 >= 2)
    return doProjection(projectionPoint, perspectiveDistance, false)

  return projectionPoint
};