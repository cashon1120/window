import * as THREE from "three";
import { Rect, Bar } from "@/threeD/basicModel";
import { createRaycaster, renderer } from "@/threeD/common";
import { angleToPI } from "@/utils/index";
import Left from "./Left";
import Top from "./Top";
import Right from "./Right";
import Bottom from "./Bottom";

// 设置窗户各个边框的宽度或者高度，注意和实际宽高的区分
export const LEFT_BAR_SIZE = 5;
export const TOP_BAR_SIZE = 5;
export const RIGHT_BAR_SIZE = 5;
export const BOTTOM_BAR_SIZE = 5;

export interface FrameProps {
  mainGroup: THREE.Group; // 最外层的group，包裹所有的元素
  width: number;
  height: number;
  leftBarSize?: number;
  topBarSize?: number;
  rightBarSize?: number;
  bottomBarSize?: number;
  left?: number;
  top?: number;
  color?: string;
  offsetZ?: number;
  // 暂时用这个来判断把手的样式
  type?: 'left' | 'right',
}

class Frame extends Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  isOpen: boolean = false;
  rotate: number = 0;
  constructor(params: FrameProps) {
    params.leftBarSize = LEFT_BAR_SIZE;
    params.topBarSize = TOP_BAR_SIZE;
    params.rightBarSize = RIGHT_BAR_SIZE;
    params.bottomBarSize = BOTTOM_BAR_SIZE;
    super(params);
    const { width, height, left = 0, top = 0, type } = params;
    // 创建玻璃
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    // 创建线渐变色 - 四个参数为坐标
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(1, "#5473b2");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      const canvasTexture = new THREE.CanvasTexture(canvas);
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true, // 透明度设置为 true
        opacity: 0.4, // 设置透明度
        roughness: 0,
        metalness: 0,
        envMapIntensity: 1,
        transmission: 0.5, // 折射度，表示光线经过材料时的衰减程度
        clearcoat: 1,
        clearcoatRoughness: 0,
        map: canvasTexture,
      });
      const glassGemotery = new THREE.BoxGeometry(width - LEFT_BAR_SIZE * 2, height - LEFT_BAR_SIZE * 2, 0.1);
      const glassMesh = new THREE.Mesh(glassGemotery, glassMaterial);
      glassMesh.castShadow = true;
      const glassGroup = new THREE.Group()
      glassGroup.position.set(this.left, this.top, 0);
      glassMesh.position.set(width / 2, -height / 2 - LEFT_BAR_SIZE, 0);
      glassGroup.add(glassMesh)
      this.group.add(glassGroup);
    }

    // 分别创建四个边框，每个边框可以自己的基础model
    this.topBar = new Top({
      height: TOP_BAR_SIZE,
      width,
      left,
      top,
      color: "#4E646E",
    });
    this.rightBar = new Right({
      height,
      width: RIGHT_BAR_SIZE,
      left: this.width + left - RIGHT_BAR_SIZE,
      top,
      color: "#4E646E",
      type,
    });
    this.leftBar = new Left({
      height,
      width: LEFT_BAR_SIZE,
      left,
      top,
      color: "#4E646E",
      type
    });
    this.bottomBar = new Bottom({
      width,
      height: BOTTOM_BAR_SIZE,
      top: this.height + top - BOTTOM_BAR_SIZE,
      left,
      color: "#4E646E",
    });
    createRaycaster(
      [this.group],
      (
        result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
      ) => {
        // 只有当点击的是把手的时候才执行动画
        if (result[0].object.name === "handle") {
          // 打开旋转-45度，关闭旋转45度
          const targetValue = this.isOpen ? angleToPI(45) : angleToPI(-45);
          // 定义一个系数， 打开的时候顺时针旋转（角度为负数），关闭的时候逆时针旋转(角度为正数)
          const coefficient = targetValue > 0 ? 1 : -1;
          let currentValue = 0;
          // 旋转速度
          const speed = 0.02;
          const animation = () => {
            currentValue += speed;
            this.group.rotateY(speed * coefficient);
            renderer.render();
            if (Math.abs(currentValue * coefficient) < Math.abs(targetValue)) {
              requestAnimationFrame(animation);
            } else {
              this.isOpen = !this.isOpen;
            }
          };
          animation();
        }
      }
    );
    this.init();
  }
}

export default Frame;
