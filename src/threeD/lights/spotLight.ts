import * as THREE from "three";
import { scene, gui, guiPosition, guiBoolean } from "../common";

interface Props {
  name?: string;
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  showHelper?: boolean;
  showGui?: boolean;
  castShadow?: boolean;
  target?: { x: number; y: number; z: number };
  intensity?: number; // 光照强度
  angle?: number; // 光源发散角度
  decay?: number; // 光源衰减 设置为0的话表示永远不会衰减
  distance?: number;
  // 聚光锥的半影衰减百分比。默认值为 0,主要是边缘的模糊度
  penumbra?: number;
}

const createSpotLight = (props: Props) => {
  const {
    x = 0,
    y = 0,
    z = 0,
    color = "#ffffff",
    showHelper,
    showGui,
    castShadow = false,
    intensity = 500,
    angle = Math.PI,
    decay = 2.0,
    target,
    name = "聚光源",
    distance = 0,
    penumbra = 0,
  } = props;
  // 创建点光源
  const light = new THREE.SpotLight(color);
  light.position.set(x, y, z);
  light.castShadow = castShadow;
  light.intensity = intensity;
  light.angle = angle;
  light.decay = decay;
  light.distance = distance;
  light.penumbra = penumbra;
  light.target.position.set(target?.x || 0, target?.y || 0, target?.z || 0);
  scene.add(light.target);
  if (showHelper) {
    const helper = new THREE.SpotLightHelper(light);
    scene.add(helper);
  }

  scene.add(light);

  if (showGui && gui) {
    const pointFolder = gui.addFolder(name);
    pointFolder.close();
    pointFolder.add(light, "intensity", 0, 2000).name(name);
    guiPosition({
      name,
      mesh: light,
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

  return light;
};

export default createSpotLight;
