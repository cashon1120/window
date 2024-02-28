/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import * as Models from "./models";
import {
  BottomFrame,
  TopFrame,
  LeftFrame,
  RightFrame,
  NormalBar,
  Window,
} from "./models";
import createLight from "./lights";
import Three from "./Three";
import createSize from "./tools/size";
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
  | NormalBar
  | Window;

export interface ThreeDObject {
  [key: string]: Model;
}

// 用来存放所有的3D模型
const ThreeD: ThreeDObject = {};


/**
 * 初始化3D场景，并返回所有3D实例
 */
const init3D = (params: Params): Three => {
  const { container, data } = params;
  if (!document.getElementById(container)){
    throw new Error(`${container} 容器不存在`);
  }
  const three = new Three({container, showStats: true, showGui: true, showHelper: true})
  createSize(three);
  createLight(320, 200, three);
  // 根据传入的数据渲染3D模型,并赋值给ThreeD对象
  Object.keys(data).forEach((key) => {
    const modelName = data[key].model;
    if (Models[modelName]) {
      ThreeD[key] = new Models[modelName]({
        ...data[key].attribute,
        threeInstance: three,
      });
    } else {
      throw new Error(`没有找到 ${modelName} 模型`);
    }
  });

  // 重新设置摄像机位置，应根据 mainGroup的位置来调整
  three.controls.minDistance = 100;
  three.controls.maxDistance = 500;
  three.camera.position.set(155, -90, 310);
  three.camera.lookAt(155, -90, 0);
  three.controls.target.copy(new THREE.Vector3(155, -90, 0));
  three.controls.update();
  three.render();
  return three;
};

// 清空画布
const reset3D = () => {
  // 这里只清除了主要内容，辅助标尺和灯光没有清除
  // scene.remove(mainGroup);
  // renderer.render();
};

export { init3D, reset3D };

