import { Frame } from "../types";
import Three from "../Three";
import models from "../models";

const createGeometryByShapePoint = (data: Frame, threeInstance: Three) => {
  const { materialObj } = data;
  if (models[materialObj.code]) {
    new models[materialObj.code]({ data, threeInstance });
  } else {
    throw new Error(`缺少型材: ${materialObj.code}`);
  }
};

export default createGeometryByShapePoint;
