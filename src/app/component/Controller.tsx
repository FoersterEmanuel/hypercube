import { FunctionComponent, ReactElement, useContext, useEffect } from "react";
import { DataContext, DataDispatchContext } from "../context/DataContext";
import { defaultDimension } from "../defaults/defaults";

interface ControlElementProps {
  title: string;
  value: number;
  min: number;
  max: number;
  step: number;
  resultFunc: (a: number) => void;
}

const ControlElement: FunctionComponent<ControlElementProps> = ({
  title,
  value,
  min,
  max,
  step,
  resultFunc
}): ReactElement => {
  return (
    <>
      <tr><td>{title}</td></tr>
      <tr>
        <td>
          <input
            type="range"
            min={min} max={max} step={step}
            value={value}
            onChange={(event) => { resultFunc(parseFloat(event.target.value)) }} />
        </td>
        <td>{value}</td>
      </tr>
    </>
  )
}


const Controller: FunctionComponent = (): ReactElement => {

  const {
    dimension,
    perspectiveDistance,
    scale,
    rotationArea,
    pointWidth,
    strokeWidth
  } = useContext(DataContext);
  const {
    setDimension,
    setPerspectiveDistance,
    setScale,
    setRotationAria,
    setPointWidth,
    setStrokeWidth
  } = useContext(DataDispatchContext);

  return (
    <div>
      <div>
        <select
          value={dimension}
          onChange={
            (event) => {
              setDimension(defaultDimension[defaultDimension.findIndex(dim => dim === event.target.value)]);
            }
          }
        >
          {
            defaultDimension
              .map(
                (dim, key) => {
                  return (
                    <option key={key} value={dim}>{dim}</option>
                  )
                }
              )
          }
        </select>
      </div>

      <table>
        <tbody>
          <ControlElement title="perspectivDistance" min={1.5} max={10.0} step={0.5} value={perspectiveDistance} resultFunc={setPerspectiveDistance} />
          <ControlElement title="scale" min={100} max={1000} step={10} value={scale} resultFunc={setScale} />
          <ControlElement title="pointWidth" min={1} max={20} step={1} value={pointWidth} resultFunc={setPointWidth} />
          <ControlElement title="strokeWidth" min={1} max={20} step={1} value={strokeWidth} resultFunc={setStrokeWidth} />
          <tr><td>FixValue</td></tr>
          {
            [...rotationArea]
              .reverse()
              .map(
                (area, key, orgRotationArea) => {
                  const resultFunc = (newValue) => {
                    const newArea = orgRotationArea.map(
                      (orgArea) => {
                        if (area.axis[0] !== orgArea.axis[0] || area.axis[1] !== orgArea.axis[1])
                          return orgArea;
                        return {
                          ...orgArea,
                          fixValue: parseInt(newValue),
                          angleMultiplicator: 0
                        }
                      }
                    );
                    setRotationAria(newArea.reverse());

                  }
                  return <ControlElement key={key} title={area.axis[0] + "-" + area.axis[1]} min={0} max={360} step={5} value={area.fixValue} resultFunc={resultFunc} />
                }
              )
          }
          <tr><td>AnimationValue</td></tr>
          {
            [...rotationArea]
              .reverse()
              .map(
                (area, key, orgRotationArea) => {
                  const resultFunc = (newValue) => {
                    const newArea = orgRotationArea.map(
                      (orgArea) => {
                        if (area.axis[0] !== orgArea.axis[0] || area.axis[1] !== orgArea.axis[1])
                          return orgArea;
                        return {
                          ...orgArea,
                          fixValue: 0,
                          angleMultiplicator: parseFloat(newValue)
                        }
                      }
                    );
                    setRotationAria(newArea.reverse());

                  }
                  return <ControlElement key={key} title={area.axis[0] + "-" + area.axis[1]} min={0} max={2} step={0.2} value={area.angleMultiplicator} resultFunc={resultFunc} />
                }
              )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Controller;