import { FunctionComponent, ReactElement, useContext, useEffect, useState } from "react";
import { fillCubeWithPoints, findCubeLineCombinations } from "../helper/figuresCreate";
import { DataContext } from "../context/DataContext";
import { Point_2D, Point_Set, Rotate_Set } from "../types/types";
import { doProjection } from "../helper/projectionMatrix";
import { rotation, sortRotationMatrix } from "../helper/rotationMatrix";


const Drawer: FunctionComponent = (): ReactElement => {

  const {
    dimension,
    perspectiveDistance,
    scale,
    rotationArea,
    pointWidth,
    strokeWidth,
  } = useContext(DataContext);

  const [angle, setAngle] = useState<number>(0);
  const [angleActive, setAngleActive] = useState<boolean>(false);
  const [points, setPoints] = useState<Point_Set[]>([{ x: 0, y: 0 }]);
  const [drawPoints, setDrawPoints] = useState<Point_2D[]>([{ x: 0, y: 0 }]);
  const [lineLinks, setLineLikes] = useState<number[][]>([[0, 0]]);


  useEffect(
    () => {
      const interval = setInterval(() => { setAngle((accu) => (accu >= 3599) ? 0 : accu + 1) }, 1);
      return () => { clearInterval(interval) };
    },
    []
  );

  useEffect(
    () => {
      setPoints(fillCubeWithPoints(dimension));
      const a = 4;
    },
    [dimension]
  );
  useEffect(
    () => {
      const rotationPoints = rotationArea
        .sort(sortRotationMatrix)
        .reduce<Point_Set[]>((acc: Point_Set[], curr: Rotate_Set): Point_Set[] => {

          return rotation(
            dimension,
            curr.axis,
            acc,
            (curr.fixValue !== 0) ?
              curr.fixValue :
              (curr.angleMultiplicator !== 0) ?
                curr.angleMultiplicator * angle :
                0
          )
        }, points)

      setDrawPoints(doProjection(rotationPoints, perspectiveDistance));
      setLineLikes(findCubeLineCombinations(points));
    },
    [angle, angleActive]
  );

  return (
    <>
      <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <rect width={1000} height={1000} fill="rgb(16, 16, 16)" />
        {
          drawPoints
            .filter((point) => !isNaN(point.x))
            .map(
              (point, key) => {
                return (
                  <circle key={key} cx={500 + point.x * scale} cy={500 + point.y * scale} r={pointWidth} stroke="white" fill="white" />
                )
              }
            )
        }
        {
          lineLinks
            .map(
              (line, key) => {
                if (drawPoints.length <= 1)
                  return (<div key={key}></div>)
                return (
                  <line
                    key={key}
                    x1={500 + (drawPoints[line[0]]).x * scale}
                    y1={500 + (drawPoints[line[0]]).y * scale}
                    x2={500 + (drawPoints[line[1]]).x * scale}
                    y2={500 + (drawPoints[line[1]]).y * scale}
                    stroke="white" strokeWidth={strokeWidth} />
                )
              }
            )
        }
      </svg>
    </>
  );
};

export default Drawer;