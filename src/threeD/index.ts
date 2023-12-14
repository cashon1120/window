/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { scene, controls, camera, renderer } from "./common";
import { createSpotLight, createAmbientLight } from "./lights";
import createCoordinate from "./tools/coordinate";
import Rect from "./basicModel/Rect";
import Frame from "./model/Frame";

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
      case "Frame":
        obj[key] = new Frame({ ...object[key], group });
        break;
      default:
        break;
    }
  });

  createAmbientLight();
  createSpotLight({ x: -width, y: -height / 2, z: -50, decay: 1, name: "左" });
  createSpotLight({ x: width * 2, y: -height / 2, z: 50,decay: 1, name: "右" });
  createSpotLight({ x: width / 2, y: height, z: -50, decay: 1,name: "上" });
  createSpotLight({ x: width / 2, y: -height * 2, z: 50,decay: 1, name: "下" });
  createSpotLight({ z: -width, name: "后" });
  const light = createSpotLight({ z: width,decay: 1, name: "前" });
  // createPointLight({ x: width / 2, y: -height / 2, z: 0, deacy: 1})
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
  camera.position.set(100, -50, 280);
  camera.lookAt(100, -50, 0);
  controls.target.copy(new THREE.Vector3(100, -50, 0));
  controls.update();

  return obj;
};

// 清空画布，暂时没实现
const reset = () => {
  renderer.dispose();
};

export { init, reset };
