/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Three from "../Three";
import { LinePoint, ShapePoint, MaterialObj } from "../types";
import { createGeometryByShapePoint } from "../utils/index";

import models from "../models";

export interface BarProps {
  threeInstance: Three;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  materialObj: MaterialObj;
}

class Bar {
  threeInstance: Three;
  group: THREE.Group;
  constructor(params: BarProps) {
    const {
      shapePoint,
      threeInstance,
      materialObj,
    } = params;
    this.threeInstance = threeInstance;
    this.group = new THREE.Group();
    try{
      const {material, extrudeConfig} = models[materialObj.code]
      const geometry = createGeometryByShapePoint(shapePoint, extrudeConfig);
      const mesh = new THREE.Mesh(geometry, material);
      this.group.add(mesh);
    }catch(err) {
      throw new Error(`貌似没有${materialObj.code}的型材`)
    }

    this.init();
  }

  init() {
    if (this.threeInstance.mainGroup) {
      this.threeInstance.mainGroup.add(this.group);
    }
  }
}

export default Bar;
