import { camera, controls } from "../common";

import createAmbientLight from "./ambientLight";
import createPointLight from "./pointLight";
import createSpotLight from "./spotLight";

// 修改文件后避免再次渲染灯光
let isCreated = false;

// 创建一系列的灯光, 每个灯光可传入 showHelper / showGui 来显示辅助线和调相关参数
const createLight = (width: number, height: number, mainGroup: THREE.Group) => {
  if (isCreated) return;
  isCreated = true;
  // 环境光
  createAmbientLight();
  // 聚光灯
  createSpotLight({ x: -width, y: -height / 2, z: -50, decay: 1, name: "左" });
  createSpotLight({
    x: width * 2,
    y: -height / 2,
    z: 50,
    decay: 1,
    name: "右",
    // showHelper: true,
    // showGui: true
  });
  createSpotLight({ x: width / 2, y: height, z: -50, decay: 1, name: "上" });
  createSpotLight({
    x: width / 2,
    y: -height * 2,
    z: 50,
    decay: 1,
    name: "下",
  });
  createSpotLight({ z: -width, name: "后" });
  // 点光源
  createPointLight({ x: width / 2, y: -height / 2, z: 0, deacy: 1 });

  // 这一个灯光跟随摄像机
  const light = createSpotLight({ z: width, decay: 1, name: "前" });
  controls.addEventListener("change", () => {
    light.target = mainGroup;
    light.position.copy(camera.position);
  });
};
export default createLight;
