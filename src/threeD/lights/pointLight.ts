import * as THREE from "three";
import Three from "../Three";

interface Props {
  threeInstance: Three;
  x: number;
  y: number;
  z: number;
  color?: string;
  intensity?: number;
  showHelper?: boolean;
  showGui?: boolean;
  castShadow?: boolean;
  distance?: number;
  deacy?: number; //衰减
  name?: string;
}

const createPointLight = (props: Props) => {
  const {
    threeInstance,
    threeInstance: { scene },
    x,
    y,
    z,
    showHelper,
    name = "点光源",
    showGui,
    color = "#ffffff",
    castShadow = false,
    distance = 0,
    intensity = 1000,
    deacy = 2,
  } = props;
  // 创建点光源
  const light = new THREE.PointLight(color, intensity, distance);
  light.userData.disableRemove = true
  light.position.set(x, y, z);
  light.castShadow = castShadow;
  light.decay = deacy;
  light.lookAt(1000, 100, 100);
  scene.add(light);

  if (showHelper) {
    const helper = new THREE.PointLightHelper(light, 5);
    scene.add(helper);
  }

  if (showGui && threeInstance.guiInstance) {
    const { guiInstance } = threeInstance;
    const pointFolder = guiInstance.gui.addFolder(name);
    pointFolder.close();
    pointFolder.add(light, "intensity", 0, 10000).name(name);
    guiInstance.guiPosition({
      mesh: light,
      name,
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

  return light;
};

export default createPointLight;
