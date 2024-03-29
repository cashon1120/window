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
import { scene, controls, camera, renderer } from "./common";
import createLight from "./lights";

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
  | NormalBar
  | Window;

export interface ThreeDObject {
  [key: string]: Model;
}

// 用来存放所有的3D模型
const ThreeD: ThreeDObject = {};

// 定义一个组， 这个组用来存放所有的子元素，对应一些类中的 mainGroup, 也方便清空整个场景
const mainGroup = new THREE.Group();

/**
 * 初始化3D场景，并返回所有3D模型(ThreeDObject)
 */
const init3D = (params: Params): ThreeDObject => {
  const { container, width, height, data } = params;

  // 在传入的container容器里渲染3D
  const containerDom = document.getElementById(container);
  if (containerDom) {
    containerDom.appendChild(renderer._renderer.domElement);
  } else {
    throw new Error(`${container} 容器不存在`);
  }

  // 创建辅助坐标尺, 会加载字体文件, 这里要卡一下
  createCoordinate();

  // 创建一系列的灯光
  createLight(width, height, mainGroup);

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

  scene.add(mainGroup);

  // 重新设置摄像机位置，应根据 mainGroup的位置来调整
  controls.minDistance = 200;
  controls.maxDistance = 300;
  camera.position.set(100, -80, 280);
  camera.lookAt(100, -50, 0);
  controls.target.copy(new THREE.Vector3(100, -80, 0));
  controls.update();
  renderer.render();

  // 返回所有对象集合，响应外部事件
  return ThreeD;
};

// 清空画布
const reset3D = () => {
  // 这里只清除了主要内容，辅助标尺和灯光没有清除
  scene.remove(mainGroup);
  renderer.render();
};

export { init3D, reset3D };

const arr = [
  {
    id: "1717156645471133698",
    metadataName: "玻扇",
    objectName: "glassFan",
    fieldId: 276,
    fieldName: "handle",
    describe: "执手",
    dataType: 2,
    metadataEnglishName: "glassFan_handle",
    metadataChineseName: "玻扇执手",
    useCount: 0,
    lastTime: "-31557014135625943",
  },
  {
    id: "1717156645471133698",
    metadataName: "玻扇",
    objectName: "glassFan",
    fieldId: 279,
    fieldName: "handleDrift",
    describe: "执手偏移",
    dataType: 2,
    metadataEnglishName: "glassFan_handleDrift",
    metadataChineseName: "玻扇执手偏移",
    useCount: 0,
    lastTime: "-31557014135625943",
  },
];

const getEnglishName = (str: string, arr: any[]) => {
  const keyValues: any = {};
  arr.forEach((item: any) => {
    keyValues[item.metadataChineseName] = item.metadataEnglishName;
  });
  const valueList = str.match(/[\u4e00-\u9fa5\d]+/g);
  const symbolList = str.match(/[^\u4e00-\u9fa5\d]/g);
  if(valueList && symbolList){
    return valueList.reduce((prev: string, cur: string, index: number) => prev + (keyValues[cur] || cur) + (symbolList[index] || ""), "");
  }
};

const str = "玻扇执手>玻扇执手偏移+100=玻扇面积x20";
console.log(getEnglishName(str, arr));
// 输入: 玻扇执手         > 玻扇执手偏移           + 100 = 玻扇面积 x 20
// 输出: glassFan_handle > glassFan_handleDrift + 100 = 玻扇面积 x 20
