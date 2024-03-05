/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Three from "../Three";
import createRaycaster from "@/threeD/common/raycaster";
import { getModelSize } from "../utils";

export interface HanleProps {
  x: number;
  y: number;
  width: number;
  threeInstance: Three;
  depth: number;
  offset?: number;
  showCoursePointerWhenHover?: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  /**
   * 下面几个参数把手自己的偏移量，在定义把手类的时候根据实际情况考虑进去, 上面的offset是数据里传进来的偏移量
   */
  selfOffsetX?: number;
  selfOffsetY?: number;
  selfOffsetZ?: number;
}

class Handle {
  group: THREE.Group;
  threeInstance: Three;
  constructor(params: HanleProps) {
    this.group = new THREE.Group();
    this.threeInstance = params.threeInstance;
  }
  init = (params: HanleProps) => {
    const {
      x,
      y,
      offset = 0,
      selfOffsetX = 0,
      selfOffsetY = 0,
      selfOffsetZ = 0,
      showCoursePointerWhenHover = true,
      width: parentGroupWidth,
      depth: parentGroupDepth,
      onClick,
      onMouseOver,
    } = params;
    /**
     * 根据父元素的大小设置把手的位置
     */
    const { width, height, depth } = getModelSize(this.group);
    this.group.position.set(
      x + parentGroupWidth / 2 - width / 2 + selfOffsetX + offset,
      -y - height + selfOffsetY,
      parentGroupDepth / 2 - depth / 2 + selfOffsetZ
    );
    this.threeInstance.mainGroup.add(this.group);

    createRaycaster(
      [this.group],
      this.threeInstance,
      /**
       * onclick事件
       */
      (
        result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
      ) => {
        if (result.length > 0) {
          onClick && onClick();
        }
      },
      /**
       * mouseover事件
       */
      (
        result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
      ) => {
        if (showCoursePointerWhenHover) {
          if (result.length > 0) {
            document.body.style.cursor = "pointer";
            setTimeout(() => {
              document.body.style.cursor = "pointer";
            }, 0);
          } else {
            document.body.style.cursor = "default";
          }
          onMouseOver && onMouseOver();
        }
      }
    );
  };
}

export default Handle;
