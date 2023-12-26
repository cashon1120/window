import Bar from "./Bar";
import * as THREE from "three";

export interface RectProps {
  mainGroup: THREE.Group; // 最外层的group，包裹所有的元素
  leftBarSize: number;
  topBarSize: number;
  rightBarSize: number;
  bottomBarSize: number;
  width: number;
  height: number;
  left?: number;
  top?: number;
  z?: number;
  color?: string;
}

interface TranformProps {
  type: "right" | "top" | "left" | "bottom" | 'width' | 'height';
  value: number;
  time?: number;
}

/**
 * 矩形框，有4个边,  默认中心坐标在0, 0 , 0, 这里改为左上角的坐标0，0，0，好跟HTML里的表现一致;
 * 在子类去实现leftBar、rightBar、topBar、bottomBar的模型初始化
 * @method transform 实现4个方向的大小变化
 */
class Rect {
  leftBar?: Bar;
  topBar?: Bar;
  rightBar?: Bar;
  bottomBar?: Bar;
  width: number;
  height: number;
  group: THREE.Group;
  top: number;
  left: number;
  right: number;
  bottom: number;
  leftBarSize: number;
  topBarSize: number;
  rightBarSize: number;
  bottomBarSize: number;
  mainGroup: THREE.Group;
  constructor(params: RectProps) {
    const {
      width,
      height,
      mainGroup,
      left = 0,
      top = 0,
      z = 0,
      leftBarSize,
      topBarSize,
      rightBarSize,
      bottomBarSize,
    } = params;
    this.width = width;
    this.height = height;
    this.top = top;
    this.bottom = height + top;
    this.left = left;
    this.right = width + left;
    this.group = new THREE.Group();
    this.mainGroup = mainGroup
    this.leftBarSize = leftBarSize
    this.topBarSize = topBarSize
    this.rightBarSize = rightBarSize
    this.bottomBarSize = bottomBarSize
    this.group.position.set(0, 0, z);
  }
  init(){
    this.topBar ? this.group.add(this.topBar.group) : null
    this.rightBar ? this.group.add(this.rightBar.group) : null
    this.bottomBar ? this.group.add(this.bottomBar.group) : null
    this.leftBar ? this.group.add(this.leftBar.group) : null
    this.mainGroup.add(this.group);
  }
  transform = (params: TranformProps) => {
    const { type, value, time = 300 } = params;
    if (typeof value !== "number" || !value) {
      throw new Error(`请输入数字`);
    }
    switch (type) {
      case "top":
        if (this.height === value) {
          return;
        }
        this.top = this.bottom - value
        this.topBar?.translate({
          type,
          value: this.top,
          time,
        });
        this.leftBar?.transform({
          type,
          value,
          time,
        });
        this.rightBar?.transform({
          type,
          value,
          time,
        });
        this.height = value;
        break;
      case "right":
        if (this.width === value) {
          return;
        }
        this.right = value - this.width + this.right;
        this.rightBar?.translate({
          type: 'left',
          value: this.right - this.rightBarSize,
        });
        this.topBar?.transform({
          type,
          value: value,
        });
        this.bottomBar?.transform({
          type,
          value,
        });
        this.width = value;
        break;
      case "bottom":
        if (this.height === value) {
          return;
        }
        this.bottom = value - this.height + this.bottom;
        this.bottomBar?.translate({
          type,
          value: this.bottom - this.bottomBarSize,
        });
        this.leftBar?.transform({
          type,
          value,
        });

        this.rightBar?.transform({
          type,
          value,
        });
        this.height = value;
        break;
      case "left":
        if (this.width === value) {
          return;
        }
        this.left = this.right - value;
        this.leftBar?.translate({
          type,
          value: this.left,
          time,
        });
        this.topBar?.transform({
          type,
          value,
          time,
        });
        this.bottomBar?.transform({
          type,
          value,
          time,
        });
        this.width = value;
        break;
    }
  };
  translate = (params: TranformProps) => {
    console.log(params)
  }
}

export default Rect;
