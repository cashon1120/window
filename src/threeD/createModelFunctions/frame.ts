import { Frame } from "../types";
import Three from "../Three";
import createModelByShapePoint from "./createModelByShapePoint";

const frame = (data: Frame[], threeInstance: Three) => {
  data.forEach((item: Frame) => {
    createModelByShapePoint(item, threeInstance)
  });
};

export default frame;
