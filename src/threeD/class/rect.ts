import Bar from "./bar";
import * as THREE from "three";

interface Props {
  group: THREE.Group;
  width: number;
  height: number;
  barWidth: number; // 这个决定了边框的宽度或者高度
  barDepth: number;
  x?: number;
  y?: number;
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
 * 矩形框，有4个边
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
  constructor(params: Props) {
    const {
      width,
      height,
      group,
      barWidth,
      barDepth = 2,
      x = 0,
      y = 0,
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
    this.top = height / 2;
    this.bottom = -height / 2;
    this.left = -width / 2;
    this.right = width / 2;
    this.barWidth = barWidth;
    this.topBar =
      topBar ||
      new Bar({
        width: width,
        height: barWidth,
        x: 0,
        y: this.height / 2,
        align: "top",
        depth: barDepth,
        color,
      });
    this.rightBar =
      rightBar ||
      new Bar({
        width: barWidth,
        height: height,
        x: this.width / 2,
        y: 0,
        align: "right",
        depth: barDepth,
        color,
      });
    this.leftBar =
      leftBar ||
      new Bar({
        width: barWidth,
        height: height,
        x: -this.width / 2,
        depth: barDepth,
        color,
        align: "left",
      });
    this.bottomBar =
      bottomBar ||
      new Bar({
        width: width,
        height: barWidth,
        y: -this.height / 2,
        align: "bottom",
        depth: barDepth,
        color,
      });
    this.group = new THREE.Group();
    this.group.position.set(x, y, z);
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
    console.log(value);
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
