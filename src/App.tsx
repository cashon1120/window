/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { init3D, reset3D } from "./threeD/index";

import dataObj from "./data";
import "./index.less";

function App() {

  useEffect(() => {
    init3D({
      width: 420,
      height: 300,
      data: dataObj,
      container: "threeD",
    })
    return reset3D;
  }, []);

  return <></>;
}

export default App;
