/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Three } from "drawboard";
import { ValueObj } from "@/types";
import data from "./data.json";

import "./index.less";

const colorList: ValueObj[] = [
  { type: "color", value: { color: "#435962" } },
  { type: "color", value: { color: "#181e26" } },
  { type: "color", value: { color: "#a8abad" } },
];

function App() {
  const [three, setThree] = useState<Three | null>(null);
  const [activeValue, setActiveValue] = useState(colorList[0].value);
  const handleChangeColor = (obj: ValueObj) => {
    if (!three) {
      return;
    }
    setActiveValue(obj.value);
    if(obj.value.color === '#435962'){
      three.updateMaterials(obj, 300010);
    }

    if(obj.value.color === '#181e26'){
      three.updateMaterials(obj, 300012);
    }

  };

  useEffect(() => {
    const three = new Three({
      container: "threeD",
      showStats: true,
      showGui: true,
      // controlType: 'custom',
      showHelper: {},
    });
    setThree(three);
    three.createModel({
      seriesCode: 'GPN80T', 
      data,
    });
  }, []);

  return (
    <ul className="colors">
      {colorList.map((item) => (
        <li
          key={item.value.color}
          className={activeValue === item.value ? "active" : ""}
          style={{ background: item.value.color }}
          onClick={() => {
            handleChangeColor(item);
          }}
        ></li>
      ))}
    </ul>
  );
}

export default App;
