/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { Frame, FanSpace, FixedSpace, FanObject } from "../types";
import Three from "../Three";
import { Glass, Bar} from "../basicModel";
import LeftHandle from "../models/ironware/LeftHandle";
import { getPotinFromGlassFrame, getModelSize } from "../utils";
import createModelByShapePoint from "./createModelByShapePoint";

const HANDLE_POSITION: any = {
  1: 'top',
  2: 'bottom',
  3: 'left',
  4: 'right',
}

interface Frames {
  [key: string]: Bar
}


const fanSpace = (data: FanSpace[], threeInstance: Three) => {
  data.forEach((item: FanSpace) => {
    const group = new THREE.Group();

    item.fanObject.forEach((fanObj: FanObject) => {
      const frames: Frames = {}
      /**
       * 创建框架
       * 注意这里需要需要获取框架的信息，后面好上把手
      */
      fanObj.fanFrame.forEach((frame: Frame) => {
        frames[frame.location] = createModelByShapePoint(frame, threeInstance)
      });

      if (fanObj.fixedSpace) {
        fanObj.fixedSpace.forEach((fixedSpace: FixedSpace) => {
          /**
           * 创建玻璃
          */
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
      /**
       * 创建把手
      */
      if (fanObj.handleInfo) {
        const {location, height, offset} = fanObj.handleInfo;
        if(frames[HANDLE_POSITION[location]]){
          const {x, width, depth} = getModelSize(frames[HANDLE_POSITION[location]].group)
          new LeftHandle({x, y: height, width, depth, offset, group})
        }
      }
    });

    // const render = () => {
    //   group.rotation.y += 0.01 * Math.PI;
    //   requestAnimationFrame(render);
    // };
    // render();
    threeInstance.mainGroup.add(group);
  });
};

export default fanSpace;
