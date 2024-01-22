import { FunctionComponent, ReactElement } from "react";
import { DataProvider } from "./context/DataContext";

import './app.css';
import HyperCubeContainer from "./container/HyperCubeContainer";
const App: FunctionComponent = ():ReactElement => {
  return (
    <DataProvider>
      <div className="mainContainer">
        <HyperCubeContainer/>
      </div>
    </DataProvider>
  )
};

export default App;