import { Bar } from "../basicModel";
import { Frame } from "../types";
import Three from "../Three";

const frame = (data: Frame[], threeInstance: Three) => {
  data.forEach((item: Frame) => {
    new Bar({
      group: threeInstance.mainGroup,
      linePoint: item.linePoint,
      shapePoint: item.shapePoint,
      materialObj: item.materialObj,
    });
  });
};

export default frame;
