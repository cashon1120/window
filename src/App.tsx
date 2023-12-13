/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { init } from "./threeD/index";
import Rect, {ChangeProps} from "./components/rect";
import "./index.less";



function App() {
  const [data, setData] = useState<any>({
    outer: {
      type: "Rect",
      left: 5,
      top: 10,
      width: 200,
      height: 100,
      barWidth: 5,
      barDepth: 10,
      maxWidth: 500,
      maxHeight: 500,
      minWidth: 50,
      minHeight: 50,
      color: "#f29e4b",
    },
    in: {
      type: "Rect",
      left: 10,
      top: 15,
      width: 100,
      height: 50,
      barWidth: 5,
      barDepth: 10,
      maxWidth: 500,
      maxHeight: 500,
      minWidth: 50,
      minHeight: 50,
      color: "#f29e4b",
    }
  });

  const updateData = (key: string, params: ChangeProps) => {
    data[key] = {
      ...data[key],
      ...params
    }
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
          data[key].type === "Rect" ? <Rect key={key} name={key} params={data[key]} threeD={threeD} onChange={updateData} /> : null
        )}
      </div>
    </>
  );
}

export default App;
