import * as THREE from "three";
import { Frame, FanSpace, FixedSpace, FanObject } from "../types";
import Three from "../Three";
import { Bar, Glass } from "../basicModel";
import { getPotinFromGlassFrame } from "../utils";

const fanSpace = (data: FanSpace[], threeInstance: Three) => {
  data.forEach((item: FanSpace) => {
    const group = new THREE.Group();
    item.fanObject.forEach((fanObj: FanObject) => {
      fanObj.fanFrame.forEach((fan: Frame) => {
        new Bar({
          group: group,
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
              group,
              size: 10,
            });
          }
        });
      }
      if (fanObj.handleInfo) {
        //   new LeftHandle()
      }
    });

    const render = () => {
      group.rotation.y += 0.01 * Math.PI;
      requestAnimationFrame(render);
    };
    render();
    threeInstance.mainGroup.add(group);
  });
};

export default fanSpace;
