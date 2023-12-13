/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { scene, controls, camera, renderer } from "./common";
import { createSpotLight, createAmbientLight } from "./lights";
import createCoordinate from "./tools/coordinate";
import Rect from "./class/rect";

export interface ObjectProps {
  [key: string]: any;
}

interface Params {
  container: string;
  width: number;
  height: number;
  object: ObjectProps;
}

const obj: any = {};

const init = (params: Params) => {
  const { container, width, height, object } = params;
  document.getElementById(container)?.appendChild(renderer.domElement);
  const group = new THREE.Group();
  // 根据传入的数据渲染3D
  Object.keys(object).forEach((key) => {
    switch (object[key].type) {
      case "Rect":
        obj[key] = new Rect({ ...object[key], group });
        break;
      default:
        break;
    }
  });

  createAmbientLight();
  createSpotLight({ x: -width * 2, name: "左" });
  createSpotLight({ x: width * 2, name: "右" });
  createSpotLight({ y: height * 2, name: "上" });
  createSpotLight({ y: -height * 2, name: "下" });
  const light = createSpotLight({ z: width, name: "前" });
  createSpotLight({ z: -width, name: "后" });

  // 创建辅助坐标尺, 会加载字体文件，会有点卡
  createCoordinate();

  controls.minDistance = 200;
  controls.maxDistance = 300;

  // 灯光跟随摄像机
  controls.addEventListener("change", () => {
    light.target = group;
    light.position.copy(camera.position);
  });

  scene.add(group);
  camera.position.set(0, 0, 300);
  controls.update();

  return obj;
};

// 清空画布，暂时没实现
const reset = () => {
  renderer.dispose();
};

export { init, reset };
