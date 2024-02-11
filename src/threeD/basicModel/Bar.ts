import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { renderer} from "@/threeD/common";

// threejs中是默认坐标在模型的中心点，这里根据 AlighType 进行偏移
export type AlignType =
  | "left-top"
  | "right-top"
  | "left-bottom"
  | "right-bottom";

export interface BarProps {
  left: number;
  top: number;
  width: number; //模型的宽度
  height: number; // 模型的高度
  depth?: number; // 模型的厚度
  color?: string;
  mainGroup?: THREE.Group;
  align?: AlignType;
}

export interface BarAnimationParams {
  type: "right" | "top" | "left" | "bottom" | 'width' | 'height';
  value: number;
  time?: number;
}

/**
 * @Class Bar
 * @method translate 实现上、下、左、右平移;
 * @method transform 实现宽高的变化
 */
class Bar {
  innerGroup: THREE.Group;
  group: THREE.Group;
  mainGroup: THREE.Group;
  width: number;
  height: number;
  bottom: number;
  top: number;
  left: number;
  right: number;
  align?: AlignType;
  // 根据 align 产生的偏移量
  offset: {
    x: number;
    y: number;
  };
  x: number;
  y: number;
  z: number;
  constructor(params: BarProps) {
    const {
      width = 10,
      height = 10,
      left,
      top,
      mainGroup,
      align = "left-top",
    } = params;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.right = left + width;
    this.bottom = top + height;
    // threejs中的坐标，这里先存一下，在init的时候会根据 align 的类型进行换算
    this.x = left;
    this.y = top;
    this.z = 0;
    this.align = align;
    this.mainGroup = mainGroup || new THREE.Group();
    this.group = new THREE.Group();

    this.innerGroup = new THREE.Group();
    this.offset = {
      x: 0,
      y: 0,
    };
  }
  init() {
    // 根据偏类型进行平移
    switch (this.align) {
      case "left-top":
        this.offset.x = this.width / 2;
        this.offset.y = -this.height / 2;
        this.x = this.width / 2 + this.x;
        this.y = -this.height / 2 - this.y;
        break;
      case "right-top":
        this.offset.x = -this.width / 2;
        this.offset.y = -this.height / 2;
        this.x = -this.width / 2 + this.x;
        this.y = -this.height / 2 - this.y;
        break;
      case "left-bottom":
        this.offset.x = this.width / 2;
        this.offset.y = this.height / 2;
        this.x = this.width / 2 + this.x;
        this.y = this.height / 2 - this.y;
        break;
      case "right-bottom":
        // 貌似用不上这种类型，前面3个暂时够用了
        break;
    }
    this.group.position.set(this.x, this.y, this.z);
    this.group.add(this.innerGroup);
    if (this.mainGroup) {
      this.mainGroup.add(this.group);
    }
  }

  /**
   * 移动只有两个方向，left / top
  */
  translate = (params: BarAnimationParams) => {
    const { type, value, time = 300 } = params;
    const target = this.group;
    const attr = type === "left" ? "x" : "y";
    // 这里注意坐标系的不同，threejs中 y 轴向下是负的，所以要反过来
    let targetValue = 0;
    switch (attr) {
      case "x":
        targetValue = value + this.offset[attr];
        break;
      case "y":
        targetValue = value - this.offset[attr];
        break;
    }
    const tween = new TWEEN.Tween(target.position)
      .to({ [attr]: targetValue * (attr === "x" ? 1 : -1) }, time)
      .start();
    let isEnd = false;
    tween.onComplete(() => {
      isEnd = true;
    });
    const render = () => {
      tween.update();
      renderer.render();
      if (!isEnd) {
        requestAnimationFrame(render);
      }
    };
    render();
  };

  /**
   * 变形有4个方向，left / right / top / bottom
  */
  transform = (params: BarAnimationParams) => {
    const { type, value, time = 300 } = params;
    if (!type) {
      throw new Error("请输入变化方向, 如: left | right | top | bottom");
    }
    const target = this.group;
    const _height = this.height;
    const _width = this.width;
    const isHorizontal = type === "right" || type === "left";
    let positionTween = new TWEEN.Tween();
    switch (type) {
      case "top":
        this.top = this.bottom - value;
        positionTween = new TWEEN.Tween(target.position)
          .to({ y: -(this.top + this.bottom) / 2 }, time)
          .start();
        break;

      case "bottom":
        this.bottom = value + this.top;
        positionTween = new TWEEN.Tween(target.position)
          .to({ y: -(this.top + this.bottom) / 2 }, time)
          .start();
        break;

      case "left":
        this.left = this.right - value;
        positionTween = new TWEEN.Tween(target.position)
          .to({ x: (this.right + this.left) / 2 }, time)
          .start();
        break;

      case "right":
        this.right = value + this.left;
        positionTween = new TWEEN.Tween(target.position)
          .to({ x: (this.right + this.left) / 2 }, time)
          .start();
        break;
    }

    const scaleType = isHorizontal ? "x" : "y";
    const scaleValue = value / (isHorizontal ? _width : _height);
    const tween = new TWEEN.Tween(target.scale)
      .to({ [scaleType]: scaleValue }, time)
      .start();
    let isEnd = false;
    tween.onComplete(() => {
      isEnd = true;
    });
    const render = () => {
      tween.update();
      positionTween.update();
      renderer.render();
      if (!isEnd) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default Bar;
