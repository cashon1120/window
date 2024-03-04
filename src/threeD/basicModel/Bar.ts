/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { LinePoint, ShapePoint, MaterialObj } from "../types";
import { createGeometryByShapePoint } from "../utils/index";

import models from "../models";

export interface BarProps {
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  materialObj: MaterialObj;
  group: THREE.Group
}

class Bar {
  constructor(params: BarProps) {
    const {
      shapePoint,
      materialObj,
      group
    } = params;
    try{
      const {material, extrudeConfig} = models[materialObj.code]
      const geometry = createGeometryByShapePoint(shapePoint, extrudeConfig);
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }catch(err) {
      throw new Error(`貌似没有${materialObj.code}的型材`)
    }
  }
}

export default Bar;
