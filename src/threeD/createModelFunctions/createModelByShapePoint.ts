import * as THREE from 'three'
import { Frame } from "../types";
import Three from "../Three";
import models from "../models";

const createGeometryByShapePoint = (data: Frame, threeInstance: Three, group?: THREE.Group) => {
  const { materialObj } = data;
  if (models[materialObj.code]) {
    return new models[materialObj.code]({ data, threeInstance, group });
  } else {
    throw new Error(`缺少型材: ${materialObj.code}`);
  }
};

export default createGeometryByShapePoint;
