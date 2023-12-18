/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { init3D } from "./threeD/index";
import { Rect, ChangeProps, VerticalBar } from "./components";
import {getRelation} from './threeD/utils'
import "./index.less";

function App() {
  const [data, setData] = useState<any>(getRelation({
    main: {
      model: "Frame",
      // relation: {
      //   top: ['horzontalBar'],
      //   bottom: ['horzontalBar'],
      //   height: ['horzontalBar']
      // },
      attribute: {
        left: 15,
        top: 15,
        width: 200,
        height: 100,
        maxWidth: 500,
        maxHeight: 500,
        minWidth: 50,
        minHeight: 50,
        color: "#f29e4b",
      }
    },
    horzontalBar: {
      model: "VerticalBar",
      attribute: {
        left: 100,
        top: 20,
        width: 5,
        height: 90,
      }
    },
  }));

  const updateData = (key: string, params: ChangeProps) => {
    
    data[key].attribute = {
      ...data[key].attribute,
      ...params,
    };
    // if(data[key].relation){
    //   Object.keys(data[key].relation).forEach((relationKey) => {
    //     const newValue = params[relationKey as keyof ChangeProps]
    //     if(newValue !== undefined){
    //       data[key].relation[relationKey].forEach((model: string) => {
    //         data[model].attribute[relationKey] = newValue
    //       })
    //     }
    //   })
    // }
    setData({ ...data });
  };

  const [threeD, setThreeD] = useState<any>();

  const render = (key: string, type: string) => {
    switch (type) {
      case "Frame":
        return (
          <Rect
            key={key}
            name={key}
            params={data[key].attribute}
            threeD={threeD}
            onChange={updateData}
          />
        );
      case "VerticalBar":
        return (
          <VerticalBar
            key={key}
            name={key}
            params={data[key].attribute}
            threeD={threeD}
            onChange={updateData}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setThreeD(
      init3D({ width: 200, height: 100, object: data, container: "threeD" })
    );
  }, []);
  return (
    <>
      <div className="rect_wrapper">
        {Object.keys(data).map((key) => (
          <div key={key}>{render(key, data[key].model)}</div>
        ))}
      </div>
    </>
  );
}

export default App;
