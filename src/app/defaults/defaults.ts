import { Dimension, Axis, Point_Set } from "../types/types";

//constans
export const defaultDimension: Dimension[] = ["2D", "3D", "4D", "5D"];
export const defaultAxis: Axis[] = ["x", "y", "z", "u", "v"];

//functions
export function getDimension(input: Point_Set): number;
export function getDimension(input: Dimension): number;
export function getDimension(input: Point_Set | Dimension): number {
  // is type Dimension
  if(typeof input === "string")
    return parseInt(input[0]);
  // else is Vector
  return Object.keys(input).length;
}
export function getDefaultPoint(heighestBinaryLength:number):Point_Set {
  return Array(heighestBinaryLength)
      .fill('')
      .map<Axis>((_a, key) => defaultAxis[key])
      .reduce<Point_Set>((acc, curr) => (acc[curr] = 0, acc), { x: 0, y: 0 });
}
export function VectorToMatrix(vector: Point_Set): number[] {
  const dimensionLevel = getDimension(vector);
  return Array(dimensionLevel).fill(0).map((_a,key)=>vector[defaultAxis[key]]);
}

export function MatrixToVector(matrix: number[]): Point_Set {
  return Object.keys(matrix).reduce((acc,curr,index)=>(acc[defaultAxis[index]]=matrix[index], acc),{x:0,y:0});
}