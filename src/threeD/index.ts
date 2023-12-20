import * as THREE from "three";
import * as Models from "./models";
import {
  BottomFrame,
  TopFrame,
  LeftFrame,
  RightFrame,
  VerticalBar,
  HorzontalBar,
  Frame,
} from "./models";
import { scene, controls, camera, renderer } from "./common";
import {
  createSpotLight,
  createAmbientLight,
  createPointLight,
} from "./lights";
import createCoordinate from "./tools/coordinate";
import { Data } from "../types";

interface Params {
  container: string;
  width: number;
  height: number;
  data: Data;
}

// 所有模型的类
export type Model =
  | BottomFrame
  | TopFrame
  | LeftFrame
  | RightFrame
  | VerticalBar
  | HorzontalBar
  | Frame;

export interface ThreeDObject {
  [key: string]: Model;
}

// 用来存放所有的3D模型
const ThreeD: ThreeDObject = {};

/**
 * 初始化3D场景，并返回所有3D模型(ThreeDObject)
 */
const init3D = (params: Params): ThreeDObject => {
  const { container, width, height, data } = params;

  // 在传入的container容器里渲染3D
  const containerDom = document.getElementById(container);
  if (containerDom) {
    containerDom.appendChild(renderer.domElement);
  } else {
    throw new Error(`${container} 容器不存在`);
  }

  // 创建辅助坐标尺, 会加载字体文件, 这里要卡一下
  createCoordinate();

  // 定义一个组， 这个组用来存放所有的子元素，对应一些类中的 mainGroup
  const mainGroup = new THREE.Group();

  // 根据传入的数据渲染3D模型,并赋值给ThreeD对象
  Object.keys(data).forEach((key) => {
    const modelName = data[key].model;
    if (Models[modelName]) {
      ThreeD[key] = new Models[modelName]({
        ...data[key].attribute,
        mainGroup,
      });
    } else {
      throw new Error(`没有找到 ${modelName} 模型`);
    }
  });

  // 创建灯光
  createLight(width, height, mainGroup);
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
// 创建一系列的灯光, 可传入 showHelper / showGui 来显示辅助线和调相关参数
const createLight = (width: number, height: number, mainGroup: THREE.Group) => {
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

// 清空画布，暂时没实现
const reset3D = () => {
  // renderer.dispose();
};

export { init3D, reset3D };
