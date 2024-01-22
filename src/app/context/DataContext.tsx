import { createContext, FunctionComponent, ReactElement, useEffect, useState } from "react";
import { defaultAxis, getDimension } from "../defaults/defaults";
import { Dimension, Rotate_Set } from "../types/types";

type DataValue = {
  dimension: Dimension;
  perspectiveDistance: number;
  scale: number;
  rotationArea: Rotate_Set[];
  pointWidth:number;
  strokeWidth:number;
}
type DispatchValue = {
  setDimension: (dimension: Dimension) => void;
  setPerspectiveDistance: (perspectiveDistance: number) => void;
  setScale: (scale: number) => void;
  setRotationAria: (rotationArea: Rotate_Set[]) => void;
  setPointWidth: (rotationArea: number) => void;
  setStrokeWidth: (rotationArea: number) => void;
};

const defaultValue: DataValue = {
  dimension: "4D",
  perspectiveDistance: 2.0,
  scale: 200,
  rotationArea: [{ axis: ["x", "y"], fixValue: 0, angleMultiplicator: 0 }],
  pointWidth:3,
  strokeWidth:1,
};
const dispatchDefault: DispatchValue = {
  setDimension: () => { },
  setPerspectiveDistance: () => { },
  setScale: () => { },
  setRotationAria: () => { },
  setPointWidth: () => { },
  setStrokeWidth: () => { },
};

const DataContext = createContext(defaultValue);
const DataDispatchContext = createContext(dispatchDefault);

interface DataProviderProps {
  children: ReactElement
}

const DataProvider: FunctionComponent<DataProviderProps> = ({ children }): ReactElement => {

  const [data, setData] = useState<DataValue>(defaultValue);

  const setDimension = (dimension: Dimension) => setData(d => ({ ...d, dimension }));
  const setPerspectiveDistance = (perspectiveDistance: number) => setData(d => ({ ...d, perspectiveDistance }));
  const setScale = (scale: number) => setData(d => ({ ...d, scale }));
  const setRotationAria = (rotationArea: Rotate_Set[]) => setData(d => ({ ...d, rotationArea }));
  const setPointWidth= (pointWidth: number) => setData(d => ({ ...d, pointWidth }));
  const setStrokeWidth= (strokeWidth: number) => setData(d => ({ ...d, strokeWidth }));

  const setValues = {
    setDimension,
    setPerspectiveDistance,
    setScale,
    setRotationAria,
    setPointWidth,
    setStrokeWidth,
  };

  useEffect(
    () => {
      const level = getDimension(data.dimension);
      const result: Rotate_Set[] = [];
      for (let i = level - 1; i >= 0; i--)
        for (let j = level - 1; j >= 0; j--)
          if (i < j)
            result.push({ axis: [defaultAxis[i], defaultAxis[j]], fixValue: 0, angleMultiplicator: 0 });
      setRotationAria(result);
    },
    [data.dimension]
  );

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={setValues}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
};

export {
  DataContext,
  DataDispatchContext,
  DataProvider
};