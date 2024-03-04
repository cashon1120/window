import { Bar } from "../basicModel";
import { CenterPillar } from "../types";
import Three from "../Three";

const centerPillar = (data: CenterPillar[], threeInstance: Three) => {
  data.forEach((item: CenterPillar) => {
    new Bar({
      group: threeInstance.mainGroup,
      linePoint: item.linePoint,
      shapePoint: item.shapePoint,
      materialObj: item.materialObj,
    });
  });
};

export default centerPillar;
