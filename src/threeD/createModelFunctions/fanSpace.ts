/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { Frame, FanSpace, FixedSpace, FanObject } from "../types";
import Three from "../Three";
import { Glass, Bar } from "../basicModel";
import LeftHandle from "../models/ironware/LeftHandle";
import {
  getPotinFromGlassFrame,
  getModelSize,
  setModelRotateCenter,
  angleToPI,
} from "../utils";
import createModelByShapePoint from "./createModelByShapePoint";

const HANDLE_POSITION: any = {
  1: "top",
  2: "bottom",
  3: "left",
  4: "right",
};

// 把手类型对应该窗户旋转的中心轴
const ROTATION_TYPE: any = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

interface Frames {
  [key: string]: Bar;
}

const fanSpace = (data: FanSpace[], threeInstance: Three) => {
  data.forEach((item: FanSpace) => {
    const group = new THREE.Group();
    const frames: Frames = {};
    let animationGroup = new THREE.Group();
    let handleType = "left";
    let isOpen = false;

    item.fanObject.forEach((fanObj: FanObject) => {
      /**
       * 创建框架
       * 注意这里需要需要获取框架的信息，后面好上把手
       */
      fanObj.fanFrame.forEach((frame: Frame) => {
        frames[frame.location] = createModelByShapePoint(
          frame,
          threeInstance,
          group
        );
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
        const { location, height, offset } = fanObj.handleInfo;
        handleType = HANDLE_POSITION[location];
        if (frames[handleType]) {
          const { x, width, depth } = getModelSize(frames[handleType].group);
          new LeftHandle({
            x,
            y: height,
            width,
            depth,
            offset,
            group,
            threeInstance,
            onClick: () => {
              // 决定旋转的方向
              let rotateCoefficient = 1;
              let rotateType = 'y'
              if (handleType === "right" || handleType === "top") {
                rotateCoefficient = -1;
              }
              if(handleType === 'top' || handleType === 'bottom'){
                rotateType = 'x'
              }
              const maxRotateAngle = isOpen
                ? angleToPI(0) * rotateCoefficient
                : angleToPI(60) * rotateCoefficient;
              const tween = new TWEEN.Tween(animationGroup.rotation)
              .to({ [rotateType]: maxRotateAngle}, 300)
              .start();
              tween.onComplete(() => {
                isOpen = !isOpen;
              });
              const render = () => {
                tween.update()
                requestAnimationFrame(render);
              };
              render();
            },
          });
        }
      }
    });

    animationGroup = setModelRotateCenter(group, ROTATION_TYPE[handleType]);
    threeInstance.mainGroup.add(animationGroup);
  });
};

export default fanSpace;
