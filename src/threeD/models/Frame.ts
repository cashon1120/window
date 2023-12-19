import * as THREE from "three";

import {Rect, Bar} from "../basicModel";
import {LeftFrame, BottomFrame, TopFrame, RightFrame} from "./index";


export interface FrameProps {
  group: THREE.Group; // 最外层的group，包裹所有的元素
  width: number;
  height: number;
  barWidth: number; // 这个决定了边框的宽度或者高度
  barDepth: number; // 边框的厚度
  left?: number;
  top?: number;
  color?: string;
  topBar?: {
    height: 5,
  };
  rightBar?: {
    width: 5,
  }
  bottomBar?: {
    height: 5,
  }
  leftBar?: {
    width: 5,
  }
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
      topBar,
      rightBar,
      bottomBar,
      leftBar,
    } = params;
    // 分别创建四个边框，每个边框可以自己的基础model
    this.topBar = new TopFrame({
      height: topBar?.height,
      width,
      x: left,
      y: top,
      color: '#e09647'
    });
    this.rightBar = new RightFrame({
      height,
      width: rightBar?.width,
      x: this.width + left,
      y: top,
      color: '#e09647'
    });
    this.leftBar = new LeftFrame({
      height,
      width: leftBar?.width,
      x: left,
      y: top,
      color: '#e09647'
    });
    this.bottomBar = new BottomFrame({
      width,
      height: bottomBar?.height,
      y: this.height + top,
      x: left,
      color: '#e09647',
    });
    this.init();
  }
}

export default Frame;
