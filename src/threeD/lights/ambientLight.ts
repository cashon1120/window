import * as THREE from "three";

import { scene, gui, guiPosition, guiBoolean } from "../common";

interface Props {
  color?: string;
  indensity?: number;
  showGui?: boolean;
}

const createAmbientLight = (props?: Props) => {
  props = props || {};
  const { color = 0xffffff, indensity = 5, showGui = false } = props;
  const light = new THREE.AmbientLight(color, indensity);
  scene.add(light);

  if (showGui) {
    const pointFolder = gui.addFolder("环境光");
    pointFolder.close();
    pointFolder.add(light, "intensity", 0, 10000).name("环境光");
    guiPosition({
      mesh: light,
      name: "环境光",
      min: -400,
      max: 400,
      folder: pointFolder,
    });
    guiBoolean({
      defaultValue: true,
      name: "显示/隐藏",
      folder: pointFolder,
      onChange: (value: boolean) => {
        light.visible = value;
      },
    });
  }
};

export default createAmbientLight;
