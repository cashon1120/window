import * as THREE from "three";
import Three from "../Three";

interface Props {
  threeInstance: Three
  color?: string;
  indensity?: number;
  showGui?: boolean;
}

const createAmbientLight = (props: Props) => {
  props = props || {};
  const { color = 0xffffff, indensity = 10, showGui = true, threeInstance, threeInstance: {scene} } = props;
  const light = new THREE.AmbientLight(color, indensity);
  light.userData.disableRemove = true
  scene.add(light);

  if (showGui && threeInstance.guiInstance) {
    const {guiInstance} = threeInstance
    const pointFolder = guiInstance.gui.addFolder("环境光");
    pointFolder.close();
    pointFolder.add(light, "intensity", 0, 100).name("环境光");
    guiInstance.guiPosition({
      mesh: light,
      name: "环境光",
      min: -400,
      max: 400,
      folder: pointFolder,
    });
    guiInstance.guiBoolean({
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
