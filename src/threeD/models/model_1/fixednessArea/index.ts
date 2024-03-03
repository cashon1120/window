import { Rect, Bar } from "@/threeD/basicModel";
import Three from "@/threeD/Three";
import Left from "./Left";
import Top from "./Top";
import Right from "./Right";
import Bottom from "./Bottom";
import config from "../config";
import Glass from "@/threeD/basicModel/glass";

const { fixednessAreaBarSize } = config;

export interface FrameProps {
  threeInstance: Three;
  width: number;
  height: number;
  left?: number;
  top?: number;
  color?: string;
}

class FixednessArea extends Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  isOpen: boolean = false;
  rotate: number = 0;
  constructor(params: FrameProps) {
    super(params);
    const { width, height, left = 0, top = 0, color } = params;
    // 分别创建四个边框，每个边框可以自己的基础model
    this.topBar = new Top({
      height: fixednessAreaBarSize,
      width,
      left,
      top,
      color,
      threeInstance: this.threeInstance,
    });
    this.rightBar = new Right({
      height,
      width: fixednessAreaBarSize,
      left: this.width + left - fixednessAreaBarSize,
      top,
      color,
      threeInstance: this.threeInstance,
    });
    this.leftBar = new Left({
      height,
      width: fixednessAreaBarSize,
      left,
      top,
      color,
      threeInstance: this.threeInstance,
    });
    this.bottomBar = new Bottom({
      width,
      height: fixednessAreaBarSize,
      top: this.height + top - fixednessAreaBarSize,
      left,
      color,
      threeInstance: this.threeInstance,
    });
    new Glass({
      width: width - fixednessAreaBarSize * 2,
      height: height - fixednessAreaBarSize * 2,
      left: left + fixednessAreaBarSize,
      top: top + fixednessAreaBarSize,
      group: this.group,
    });
    this.init();
  }
}

export default FixednessArea;
