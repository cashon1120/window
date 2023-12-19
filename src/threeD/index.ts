/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import * as Models from "./models";
import { scene, controls, camera, renderer } from "./common";
import {
  createSpotLight,
  createAmbientLight,
  createPointLight,
} from "./lights";
import createCoordinate from "./tools/coordinate";

export interface ObjectProps {
  [key: string]: any;
}

interface Params {
  container: string;
  width: number;
  height: number;
  object: ObjectProps;
}

// 用来存放所有的3D模型
const ThreeD: any = {};

const init3D = (params: Params) => {
  const { container, width, height, object } = params;

  // 在指定容器里渲染
  document.getElementById(container)?.appendChild(renderer.domElement);

  // 创建辅助坐标尺, 会加载字体文件要卡一下
  createCoordinate();

  // 定义一个组， 这个组用来存放所有的子元素，对应一些类中的 mainGroup
  const mainGroup = new THREE.Group();

  // 根据传入的数据渲染3D
  Object.keys(object).forEach((key) => {
    const modelName = object[key].model as keyof typeof Models;
    if (Models[modelName]) {
      ThreeD[key] = new Models[modelName]({
        ...object[key].attribute,
        group: mainGroup,
      });
    }
  });

  // 创建一系列的灯光
  createAmbientLight();
  createSpotLight({ x: -width, y: -height / 2, z: -50, decay: 1, name: "左" });
  createSpotLight({
    x: width * 2,
    y: -height / 2,
    z: 50,
    decay: 1,
    name: "右",
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
  createPointLight({ x: width / 2, y: -height / 2, z: 0, deacy: 1 });

  // 这一个灯光跟随摄像机
  const light = createSpotLight({ z: width, decay: 1, name: "前" });
  controls.addEventListener("change", () => {
    light.target = mainGroup;
    light.position.copy(camera.position);
  });

  scene.add(mainGroup);

  // 重新设置摄像机位置，应根据 mainGroup的位置来调整
  controls.minDistance = 200;
  controls.maxDistance = 300;
  camera.position.set(100, -50, 280);
  camera.lookAt(100, -50, 0);
  controls.target.copy(new THREE.Vector3(100, -50, 0));
  controls.update();

  // 返回所有对象集合，响应外部事件
  return ThreeD;
};

// 清空画布，暂时没实现
const reset = () => {
  // renderer.dispose();
};

export { init3D, reset };
