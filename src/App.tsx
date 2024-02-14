/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from "three";
import { useEffect, useState } from "react";
import { renderer } from "./threeD/common";
import { init3D, reset3D } from "./threeD/index";

import dataObj from "./data";
import "./index.less";

const colorList = ['#4a616b', '#35441d', '#1e2733']

const findGroupChildren = (children: any[], color: string) => {
  children.forEach((item: any) => {
    if (item.isGroup) {
      findGroupChildren(item.children, color)
    }
    if (item.isMesh && !item.userData.disableUpdate) {
      item.material.color = new THREE.Color(color)
    }
  })
}


function App() {
  const [threeD, setThreeD] = useState<any>({});
  const [activeColor, setActiveColor] = useState(colorList[0])
  const handleChangeColor = (color: string) => {
    setActiveColor(color)
    Object.keys(threeD).forEach((key: string) => {
      if (threeD[key].group) {
        findGroupChildren(threeD[key].group.children, color)
      }
    })
    renderer.render()
  }

  useEffect(() => {
    setThreeD(init3D({
      width: 320,
      height: 200,
      data: dataObj,
      container: "threeD",
    }))
    return reset3D;
  }, []);

  return <>
    <ul className="colors">
      {colorList.map((color: string) => <li key={color} className={activeColor === color ? 'active' : ''} style={{ background: color }} onClick={() => { handleChangeColor(color) }}></li>)}
    </ul>
  </>;
}

export default App;
