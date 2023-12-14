/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { init3D } from "./threeD/index";
import Rect, {ChangeProps} from "./components/rect";
import "./index.less";

function App() {
  const [data, setData] = useState<any>({
    outer: {
      type: "Frame",
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      maxWidth: 500,
      maxHeight: 500,
      minWidth: 50,
      minHeight: 50,
      color: "#f29e4b",
    },
    // horzontalBar: {
    //   type: "HorzontalBar",
    //   left: 0,
    //   top: 0,
    //   width: 200,
    //   height: 100,
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   minWidth: 50,
    //   minHeight: 50,
    // },
    // in: {
    //   type: "Rect",
    //   left: 10,
    //   top: 15,
    //   width: 100,
    //   height: 50,
    //   barWidth: 5,
    //   barDepth: 10,
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   minWidth: 50,
    //   minHeight: 50,
    //   color: "#f29e4b",
    // }
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
    setThreeD(init3D({ width: 200, height: 100, object: data, container: "threeD" }));
  }, []);
  return (
    <>
      <div className="rect_wrapper">
        {Object.keys(data).map((key) =>
          data[key].type === "Frame" ? <Rect key={key} name={key} params={data[key]} threeD={threeD} onChange={updateData} /> : null
        )}
      </div>
    </>
  );
}

export default App;
