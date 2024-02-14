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
  createAmbientLight({ indensity: 0.5 });

  // 上1-1
  createSpotLight({
    x: width * (1 / 4),
    y: 130,
    z: 300,
    decay: 1,
    name: "上1-1",
    intensity: 1200,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 1) / 4,
      y: -height / 2,
      z: 0,
    },
  });
  // 上1-2
  createSpotLight({
    x: width * (1 / 4),
    y: 130,
    z: -150,
    decay: 1,
    name: "上1-2",
    intensity: 1000,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 1) / 4,
      y: -height / 2,
      z: 0,
    },
  });

  // 上2-1
  createSpotLight({
    x: (width * 3) / 4,
    y: 130,
    z: 300,
    decay: 1,
    name: "上2-1",
    intensity: 1000,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 3) / 4,
      y: -height / 2,
      z: 0,
    },
  });
  // 上2-2
  createSpotLight({
    x: (width * 3) / 4,
    y: 130,
    z: -300,
    decay: 1,
    name: "上2-2",
    intensity: 1000,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 3) / 4,
      y: -height / 2,
      z: 0,
    },
  });

  //右阴影
  createSpotLight({
    x: width + 80,
    y: -height / 2,
    z: 206,
    decay: 1,
    name: "右阴影",
    intensity: 400,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 3) / 4,
      y: -height / 2,
      z: 0,
    },
  });

  // 右照亮
  createSpotLight({
    x: width + 150,
    y: -height / 2,
    z: 0,
    decay: 1,
    name: "右照亮",
    intensity: 1000,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 3) / 4,
      y: -height / 2,
      z: 0,
    },
  });



  // 底部照亮
  createSpotLight({
    x: width / 2,
    y: -height - 200,
    z: 0,
    decay: 1,
    name: "底部照亮",
    intensity: 1000,
    // showHelper: true,
    showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });

  // 左
  createSpotLight({
    x: -80,
    y: -height / 2,
    z: 206,
    decay: 1.2,
    name: "左",
    intensity: 1300,
    // // showHelper: true,
    // showGui: true,
    castShadow: true,
    angle: 0.8,
    penumbra: 1,
    target: {
      x: (width * 3) / 4,
      y: -height / 2,
      z: 0,
    },
  });

  // 前
  createSpotLight({
    x: width / 2,
    y: -height / 2,
    z: 300,
    decay: 1,
    name: "前",
    intensity: 200,
    // showHelper: true,
    showGui: true,
    angle: 0.6,
    penumbra: 1,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
  });

    // 后
    createSpotLight({
      x: width / 2,
      y: -height / 2,
      z: -300,
      decay: 1,
      name: "后",
      intensity: 200,
      // showHelper: true,
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
