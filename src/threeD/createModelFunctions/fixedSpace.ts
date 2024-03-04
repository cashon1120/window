import { Bar } from "../basicModel";
import { SubObject, FixedSpace } from "../types";
import Three from "../Three";
import { getPotinFromGlassFrame } from "../utils";
import { Glass } from "../basicModel";

const fixedSpace = (data: FixedSpace[], threeInstance: Three) => {
  data.forEach((item: FixedSpace) => {
    if (item.glass) {
      const { width, height, glassFrame } = item.glass;
      const { left, top } = getPotinFromGlassFrame(glassFrame);
      new Glass({ width, height, left, top, group: threeInstance.mainGroup });
    }
    // 框架
    item.subObject.forEach((subObject: SubObject) => {
      new Bar({
        threeInstance,
        linePoint: subObject.linePoint,
        shapePoint: subObject.shapePoint,
        materialObj: subObject.materialObj,
      });
    });
  });
};

export default fixedSpace;
