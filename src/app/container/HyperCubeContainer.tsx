import { FunctionComponent, ReactElement, useState } from "react";
import { DataProvider } from "../context/DataContext";
import Controller from "../component/Controller";
import Drawer from "../component/Drawer";


const HyperCubeContainer: FunctionComponent = (): ReactElement => {
  return (
    <DataProvider>
      <>
        <div className="drawer_container">
          <Drawer />
        </div>
        <div className="controller_container">
          <Controller />
        </div>
      </>
    </DataProvider>
  );
};

export default HyperCubeContainer;