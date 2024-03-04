import { Rect, Bar } from "@/threeD/basicModel";
import Three from "@/threeD/Three";
import Left from "./frames/Left";
import Top from "./frames/Top";
import Right from "./frames/Right";
import Bottom from "./frames/Bottom";
import FixednessArea from "./fixednessArea";
import config from "./config";

export interface FrameProps {
  threeInstance: Three;
  width: number;
  height: number;
  windowProps: {
    width: number;
    height: number;
    position: "left" | "right";
  };
  left?: number;
  top?: number;
  color?: string;
}

class Model_1 extends Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  isOpen: boolean = false;
  rotate: number = 0;
  constructor(params: FrameProps) {
    super(params);
    const { width, height, left = 0, top = 0, color, windowProps } = params;
    // 分别创建四个边框，每个边框可以自己的基础model
    this.topBar = new Top({
      height: config.outBarSize,
      width,
      left,
      top,
      color,
      threeInstance: this.threeInstance,
    });
    this.rightBar = new Right({
      height,
      width: config.outBarSize,
      left: this.width + left - config.outBarSize,
      top,
      color,
      threeInstance: this.threeInstance,
    });
    this.leftBar = new Left({
      height,
      width: config.outBarSize,
      left,
      top,
      color,
      threeInstance: this.threeInstance,
    });
    this.bottomBar = new Bottom({
      width,
      height: config.outBarSize,
      top: this.height + top - config.outBarSize,
      left,
      color,
      threeInstance: this.threeInstance,
    });

    const { width: windowWidth, height: windowHeight, position } = windowProps;

    // 大的那扇
    new FixednessArea({
      top: config.outBarSize,
      left: position === "left" ? windowWidth : 0,
      height: height - config.outBarSize * 2,
      width: width - windowWidth - config.outBarSize,
      threeInstance: this.threeInstance,
      color,
    });
    // 小的那扇
    new FixednessArea({
      top: config.outBarSize + windowHeight,
      left: position === "right" ? windowWidth : config.outBarSize,
      height: height - config.outBarSize * 2 - windowHeight,
      width: windowWidth - config.grooveSize,
      threeInstance: this.threeInstance,
      color,
    });
    this.init();
  }
}

export default Model_1;
