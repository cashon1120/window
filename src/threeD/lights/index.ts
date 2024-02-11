import { camera, controls } from "../common";

import createAmbientLight from "./ambientLight";
import createPointLight from "./pointLight";
import createSpotLight from "./spotLight";
import createDirectionalLight from "./directionalLight";

// 修改文件后避免再次渲染灯光
let isCreated = false;

// 创建一系列的灯光, 每个灯光可传入 showHelper / showGui 来显示辅助线和调相关参数
const createLight = (width: number, height: number, mainGroup: THREE.Group) => {
  if (isCreated) return;
  isCreated = true;
  // 环境光
  createAmbientLight({ indensity: 2 });
  createDirectionalLight({
    x: width,
    y: height * 2,
    z: 340,
    intensity: 3,
    showGui: true,
    showHelper: true,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });

  createDirectionalLight({
    x: -width,
    y: height * 2,
    z: -200,
    intensity: 3,
    showGui: true,
    showHelper: true,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });

  // 上
  createSpotLight({
    x: width / 2,
    y: height,
    z: 0,
    decay: 1,
    name: "上",
    intensity: 1200,
    showHelper: true,
    showGui: true,
    angle: 0.6,
    penumbra: 1,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });

  // 前
  createSpotLight({
    x: width / 2,
    y: -height / 2,
    z: 264,
    decay: 1,
    name: "前",
    intensity: 1200,
    showHelper: true,
    showGui: true,
    angle: 0.6,
    penumbra: 1,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });

  // 右
  createSpotLight({
    x: width + width / 2,
    y: height,
    z: 0,
    decay: 1,
    name: "右",
    intensity: 1200,
    showHelper: true,
    showGui: true,
    angle: 0.6,
    penumbra: 1,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });
};
export default createLight;
