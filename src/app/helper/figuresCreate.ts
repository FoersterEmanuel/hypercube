import { getDimension, getDefaultPoint, defaultAxis, VectorToMatrix, MatrixToVector } from "../defaults/defaults";
import { Dimension, Point_Set } from "../types/types";

export function fillCubeWithPoints(dimension: Dimension): Point_Set[] {
  const pointsCount: number = Math.pow(2, getDimension(dimension));
  const heighestBinaryLength: number = (pointsCount - 1).toString(2).length;
  const defaultPoint: Point_Set = getDefaultPoint(heighestBinaryLength)

  return Array(pointsCount)
    .fill(Object.assign({}, defaultPoint))
    .map<Point_Set>(
      (PointValue: Point_Set, PointId): Point_Set => {
        PointId
          .toString(2)
          .padStart(heighestBinaryLength, "0")
          .split('')
          .forEach(
            (preVal, achsesKey) => PointValue[defaultAxis[achsesKey]] = (parseInt(preVal) === 0) ? -1 : 1
          );
        return Object.assign({}, PointValue);
      }
    );
};

export function findCubeLineCombinations(points: Point_Set[]): number[][] {
  const pointsMatrix: (0 | 1)[][] = points.map((point) => VectorToMatrix(point).map(val => val === -1 ? 0 : 1))
  return pointsMatrix
    .map<number[][] | undefined>(
      (point: (0 | 1)[]): number[][] | undefined => {
        // has the point odd count of "1"
        const isMainLinkedPoint = point.reduce<number>((acc, curr) => (curr === 1) ? acc + 1 : acc, 0) % 2 === 0;
        if (!isMainLinkedPoint) return;

        //is mainpoint
        const negPoint = point.map(p => p === 0 ? 1 : 0);
        const pointInDec = parseInt(point.join(''), 2)

        return negPoint
          .reverse()
          .map<number[]>((key, id) => [pointInDec, pointInDec + Math.pow(2, id) * ((key === 1) ? 1 : -1)])
      }
    )
    //.filter((lines: number[][] | undefined): boolean => lines !== undefined)
    .reduce<number[][]>(
      (acc:number[][], curr:number[][]|undefined) => {
        return ((curr === undefined)?acc:acc.push(...curr)),acc
      },
      []
    )
}