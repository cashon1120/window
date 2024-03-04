/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Three from "../Three";
import { LinePoint, ShapePoint, MaterialObj } from "../types";
import { createGeometryByShapePoint } from "../utils/index";

import models from "../models";

// threejs中是默认坐标在模型的中心点，这里根据 AlighType 进行偏移
export type AlignType =
  | "left-top"
  | "right-top"
  | "left-bottom"
  | "right-bottom";

export interface BarProps {
  threeInstance: Three;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  materialObj: MaterialObj;
  depth?: number; // 模型的厚度
  color?: string;
  mainGroup?: THREE.Group;
  align?: AlignType;
  // 暂时用来判断把手的样式
  type?: "left" | "right";
}

export interface BarAnimationParams {
  type: "right" | "top" | "left" | "bottom" | "width" | "height";
  value: number;
  time?: number;
}

/**
 * @Class Bar
 * @method translate 实现上、下、左、右平移;
 * @method transform 实现宽高的变化
 */
class Bar {
  threeInstance: Three;
  innerGroup: THREE.Group;
  group: THREE.Group;
  top: number;
  left: number;
  right: number;
  align?: AlignType;
  // 根据 align 产生的偏移量
  offset: {
    x: number;
    y: number;
  };
  z: number;
  constructor(params: BarProps) {
    const {
      linePoint: { startX, startY, endX },
      shapePoint,
      align = "left-top",
      threeInstance,
      materialObj,
    } = params;

    this.top = startY;
    this.left = startX;
    this.right = endX;
    this.z = 0;
    this.align = align;
    this.threeInstance = threeInstance;
    this.group = new THREE.Group();
    const {material, extrudeConfig} = models[materialObj.code]
    const geometry = createGeometryByShapePoint(shapePoint, extrudeConfig);
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup = new THREE.Group();
    this.innerGroup.add(mesh);
    this.offset = {
      x: 0,
      y: 0,
    };
    this.init();
  }

  init() {
    this.group.add(this.innerGroup);
    if (this.threeInstance.mainGroup) {
      this.threeInstance.mainGroup.add(this.group);
    }
  }
}

export default Bar;
