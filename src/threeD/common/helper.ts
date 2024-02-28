import * as THREE from "three";
import Gui from "./gui";

interface HelperParams {
  scene: THREE.Scene;
  guiInstance?: Gui;
  color?: string | number;
  size?: number; // 坐标格尺寸. 默认为 10.
  divisions?: number; // 坐标格细分次数. 默认为 10
}

class Helper {
  scene: THREE.Scene;
  guiInstance?: Gui;
  constructor(params: HelperParams) {
    const {
      scene,
      guiInstance,
      color = 0x666666,
      size = 1000,
      divisions = 10,
    } = params;
    this.scene = scene;
    this.guiInstance = guiInstance;
    this.init(color, size, divisions);
  }
  init = (color: string | number, size: number, divisions: number) => {
    const { scene } = this;
    // 坐标辅助
    const axesHelper = new THREE.AxesHelper(350);
    // 在清空的时候不删除
    axesHelper.userData.disableRemove = true
    scene.add(axesHelper);
    // 地面网格辅助
    const gridHelper = new THREE.GridHelper(size, divisions, color, color);
    // 在清空的时候不删除
    gridHelper.userData.disableRemove = true
    scene.add(gridHelper);
    if (this.guiInstance) {
      const folder = this.guiInstance.gui.addFolder("辅助");
      folder.close();
      this.guiInstance.guiBoolean({
        defaultValue: true,
        name: "三维坐标",
        folder,
        onChange: (value) => {
          axesHelper.visible = value;
        },
      });
      this.guiInstance.guiBoolean({
        defaultValue: true,
        name: "平面网格",
        folder,
        onChange: (value) => {
          gridHelper.visible = value;
        },
      });
    }
  };
}

export default Helper;
