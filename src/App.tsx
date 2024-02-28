/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Three from '@/threeD/Three'

import { init3D, reset3D } from "./threeD/index";
import { ValueObj } from '@/types'

import dataObj from "./data";
import "./index.less";


const colorList: ValueObj[] = [
  { type: 'color', value: { color: '#435962' } },
  { type: 'color', value: { color: '#181e26' } },
  { type: 'color', value: { color: '#a8abad' } },
]


function App() {
  const [three, setThree] = useState<Three | null>(null);
  const [activeValue, setActiveValue] = useState(colorList[0].value)
  const handleChangeColor = (obj: ValueObj) => {
    if(!three){
      return
    }
    setActiveValue(obj.value)
    three.updateMaterials(obj)
  }

  useEffect(() => {
    setThree(init3D({
      width: 320,
      height: 200,
      data: dataObj,
      container: "threeD",
    }))
    return reset3D;
  }, []);

  return <>
    <ul className="colors">
      {colorList.map((item) => <li key={item.value.color} className={activeValue === item.value ? 'active' : ''} style={{ background: item.value.color }} onClick={() => { handleChangeColor(item) }}></li>)}
    </ul>
  </>;
}

export default App;
