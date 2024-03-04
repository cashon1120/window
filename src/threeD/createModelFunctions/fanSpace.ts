import { Frame, FanSpace, FixedSpace, FanObject } from "../types";
import Three from "../Three";
import { Bar, Glass } from "../basicModel";
import { getPotinFromGlassFrame } from "../utils";

const fanSpace = (data: FanSpace[], threeInstance: Three) => {
  data.forEach((item: FanSpace) => {
    item.fanObject.forEach((fanObj: FanObject) => {
      fanObj.fanFrame.forEach((fan: Frame) => {
        new Bar({
          threeInstance,
          linePoint: fan.linePoint,
          shapePoint: fan.shapePoint,
          materialObj: fan.materialObj,
        });
      });
      if (fanObj.fixedSpace) {
        fanObj.fixedSpace.forEach((fixedSpace: FixedSpace) => {
          if (fixedSpace.glass) {
            const { width, height, glassFrame } = fixedSpace.glass;
            const { left, top } = getPotinFromGlassFrame(glassFrame);
            new Glass({
              width,
              height,
              left,
              top,
              group: threeInstance.mainGroup,
              size: 10,
            });
          }
        });
      }
      if (fanObj.handleInfo) {
        //   new LeftHandle()
      }
    });
  });
};

export default fanSpace;
