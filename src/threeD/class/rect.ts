import Bar from "./bar";
import * as THREE from "three";

export interface RectProps {
  group: THREE.Group;
  width: number;
  height: number;
  barWidth: number; // 这个决定了边框的宽度或者高度
  barDepth: number; // 边框的厚度
  left?: number;
  top?: number;
  z?: number;
  leftBar?: Bar;
  topBar?: Bar;
  rightBar?: Bar;
  bottomBar?: Bar;
  color?: string;
}

interface TranformProps {
  type: "right" | "top" | "left" | "bottom";
  value: number;
  time?: number;
}

/**
 * 矩形框，有4个边, 默认左上角的坐标设置为0，0，0
 */
class Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  barWidth: number;
  width: number;
  height: number;
  barDepth: number;
  group: THREE.Group;
  top: number;
  left: number;
  right: number;
  bottom: number;
  constructor(params: RectProps) {
    const {
      width,
      height,
      group,
      barWidth,
      barDepth = 2,
      left = 0,
      top = 0,
      z = 0,
      leftBar,
      topBar,
      rightBar,
      bottomBar,
      color = "#eeeeee",
    } = params;
    this.width = width;
    this.height = height;
    this.barDepth = barDepth;
    this.top = -top;
    this.bottom = -height - top;
    this.left = left;
    this.right = width + left;
    this.barWidth = barWidth;
    this.topBar =
      topBar ||
      new Bar({
        width: width,
        height: barWidth,
        x: width / 2 + left,
        y: -top,
        align: "top",
        depth: barDepth,
        color,
      });
    this.rightBar =
      rightBar ||
      new Bar({
        width: barWidth,
        height: height,
        x: this.width + left,
        y: -this.height / 2 - top,
        align: "right",
        depth: barDepth,
        color,
      });
    this.leftBar =
      leftBar ||
      new Bar({
        width: barWidth,
        height: height,
        x: left,
        y: -this.height / 2 - top,
        depth: barDepth,
        color,
        align: "left",
      });
    this.bottomBar =
      bottomBar ||
      new Bar({
        width: width,
        height: barWidth,
        y: -this.height - top,
        x:  width / 2 + left,
        align: "bottom",
        depth: barDepth,
        color,
      });
    this.group = new THREE.Group();
    console.log(left, top);
    this.group.position.set(0, 0, z);
    this.group.add(this.topBar.group);
    this.group.add(this.rightBar.group);
    this.group.add(this.bottomBar.group);
    this.group.add(this.leftBar.group);
    group.add(this.group);
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
        this.top = value - this.height + this.top;
        this.topBar.translate({
          type,
          value: this.top,
          time,
        });
        this.leftBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value,
          time,
        });
        this.rightBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
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
        this.rightBar.translate({
          type,
          value: this.right,
          time,
        });
        this.topBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value: value,
          time,
        });
        this.bottomBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value,
          time,
        });
        this.width = value;
        break;
      case "bottom":
        if (this.height === value) {
          return;
        }
        this.bottom = this.top - value;
        this.bottomBar.translate({
          type,
          value: this.bottom,
          time,
        });
        this.leftBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value,
          time,
        });

        this.rightBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value,
          time,
        });
        this.height = value;
        break;

      case "left":
        if (this.width === value) {
          return;
        }
        this.left = this.right - value;
        this.leftBar.translate({
          type,
          value: this.left,
          time,
        });
        this.topBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value,
          time,
        });
        this.bottomBar.transform({
          type,
          left: this.left,
          right: this.right,
          top: this.top,
          bottom: this.bottom,
          value,
          time,
        });
        this.width = value;
        break;
    }
  };
}

export default Rect;
