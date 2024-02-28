import * as THREE from "three";
import Gui from "./gui";

interface HelperParams {
  scene: THREE.Scene;
  guiInstance?: Gui;
}

class Helper {
  scene: THREE.Scene;
  guiInstance?: Gui;
  constructor(params: HelperParams) {
    const { scene,  guiInstance } = params;
    this.scene = scene;
    this.guiInstance = guiInstance;
    this.init();
  }
  init = () => {
    const { scene } = this;
    const axesHelper = new THREE.AxesHelper(350);
    const gridHelper = new THREE.GridHelper(1000, 80, 0xfafafa, 0xfafafa);
    scene.add(axesHelper);
    // 添加网格辅助线
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
