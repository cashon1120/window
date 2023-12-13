/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { init } from "./threeD/index";
import Rect from "./components/rect";
import "./index.less";



function App() {
  const [data, setData] = useState<any>({
    outer: {
      type: "Rect",
      width: 200,
      height: 100,
      barWidth: 4,
      barDepth: 8,
      maxWidth: 500,
      maxHeight: 500,
      minWidth: 50,
      minHeight: 50,
      color: "#f29e4b",
    },
  });

  const updateData = (nameKey: string, valueKey: string, value: number ) => {
    data[nameKey][valueKey] = value;
    setData({...data });
  }

  const [threeD, setThreeD] = useState<any>()

  useEffect(() => {
    setThreeD(init({ width: 200, height: 100, object: data, container: "threeD" }));
  }, []);
  return (
    <>
      <div className="rect_wrapper">
        {Object.keys(data).map((key) =>
          data[key].type === "Rect" ? <Rect name={key} params={data[key]} threeD={threeD} onChange={updateData} /> : null
        )}
      </div>
    </>
  );
}

export default App;
