import { Rect, Bar } from "@/threeD/basicModel";
import Three from "@/threeD/Three";
import Left from "./Left";
import Top from "./Top";
import Right from "./Right";
import Bottom from "./Bottom";
import { ValueObj } from "@/types";
import config from "../config";




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
      height: config.fixednessAraaBarSize,
      width,
      left,
      top,
      color,
      threeInstance: this.threeInstance
    });
    this.rightBar = new Right({
      height,
      width: config.fixednessAraaBarSize,
      left: this.width + left - config.fixednessAraaBarSize,
      top,
      color,
      threeInstance: this.threeInstance
    });
    this.leftBar = new Left({
      height,
      width: config.fixednessAraaBarSize,
      left,
      top,
      color,
      threeInstance: this.threeInstance
    });
    this.bottomBar = new Bottom({
      width,
      height: config.fixednessAraaBarSize,
      top: this.height + top - config.fixednessAraaBarSize,
      left,
      color,
      threeInstance: this.threeInstance
    });
   
    this.init();
  }

  updateMaterial = (obj: ValueObj) => {
    this.topBar.updateMaterial(obj);
    this.leftBar.updateMaterial(obj);
    this.rightBar.updateMaterial(obj);
    this.bottomBar.updateMaterial(obj);
  };
}

export default FixednessArea;
