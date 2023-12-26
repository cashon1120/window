import * as THREE from "three";

import { Rect, Bar } from "../../basicModel";
import Left from './Left'
import Top from './Top'
import Right from './Right'
import Bottom from './Bottom'

// 设置窗户各个边框的宽度或者高度，注意和实际宽高的区分
export const LEFT_BAR_SIZE = 3;
export const TOP_BAR_SIZE = 3;
export const RIGHT_BAR_SIZE= 3;
export const BOTTOM_BAR_SIZE = 3;

export interface FrameProps {
  mainGroup: THREE.Group; // 最外层的group，包裹所有的元素
  width: number;
  height: number;
  left?: number;
  top?: number;
  color?: string;
  topBar?: {
    height: 5;
  };
  rightBar?: {
    width: 5;
  };
  bottomBar?: {
    height: 5;
  };
  leftBar?: {
    width: 5;
  };
}

class Frame extends Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  constructor(params: FrameProps) {
    super(params);
    const {
      width,
      height,
      left = 0,
      top = 0,
    } = params;
    // 分别创建四个边框，每个边框可以自己的基础model
    this.topBar = new Top({
      height: TOP_BAR_SIZE,
      width,
      left,
      top,
      color: "#e09647",
    });
    this.rightBar = new Right({
      height,
      width: RIGHT_BAR_SIZE,
      left: this.width + left - RIGHT_BAR_SIZE,
      top,
      color: "#e09647",
    });
    this.leftBar = new Left({
      height,
      width: LEFT_BAR_SIZE,
      left,
      top,
      color: "#e09647",
    });
    this.bottomBar = new Bottom({
      width,
      height: BOTTOM_BAR_SIZE,
      top: this.height + top - BOTTOM_BAR_SIZE,
      left,
      color: "#e09647",
    });
    this.init();
  }
}

export default Frame;
