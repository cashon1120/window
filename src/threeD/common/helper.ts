import * as THREE from "three";
import gui, { guiBoolean } from "./gui";

export const axesHelper = new THREE.AxesHelper(350);
export const gridHelper = new THREE.GridHelper(1000, 80, 0xfafafa, 0xfafafa);

// 添加辅助，显示隐藏在 gui 里控制
export default (scene: THREE.Scene) => {
  // 添加坐标辅助线
  scene.add(axesHelper);
  // 添加网格辅助线
  scene.add(gridHelper);
  console.log(gui)
  if (gui) {
    const folder = gui.addFolder("辅助");
    folder.close();
    guiBoolean({
      defaultValue: true,
      name: "三维坐标",
      folder,
      onChange: (value) => {
        axesHelper.visible = value;
      },
    });
    guiBoolean({
      defaultValue: true,
      name: "平面网格",
      folder,
      onChange: (value) => {
        gridHelper.visible = value;
      },
    });
  }
};
