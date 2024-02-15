import * as THREE from "three";
import { Rect, Bar } from "@/threeD/basicModel";
import { createRaycaster, renderer } from "@/threeD/common";
import TWEEN from "@tweenjs/tween.js";
import Left from "./Left";
import Top from "./Top";
import Right from "./Right";
import Bottom from "./Bottom";
import { ValueObj } from "@/types";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const loader = new FontLoader();
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
  type?: "left" | "right";
}

class Frame extends Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  isOpen: boolean = false;
  rotate: number = 0;
  type?: "left" | "right";
  constructor(params: FrameProps) {
    params.leftBarSize = LEFT_BAR_SIZE;
    params.topBarSize = TOP_BAR_SIZE;
    params.rightBarSize = RIGHT_BAR_SIZE;
    params.bottomBarSize = BOTTOM_BAR_SIZE;
    super(params);
    const { width, height, left = 0, top = 0, type, color } = params;
    this.type = type;
    // 创建玻璃
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    // 创建线渐变色 - 四个参数为坐标
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(1, "#3664c1");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      const canvasTexture = new THREE.CanvasTexture(canvas);
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true, // 透明度设置为 true
        opacity: 0.3, // 设置透明度
        roughness: 0,
        metalness: 0,
        envMapIntensity: 1,
        transmission: 0.5, // 折射度，表示光线经过材料时的衰减程度
        clearcoat: 1,
        clearcoatRoughness: 0,
        map: canvasTexture,
      });
      const glassGemotery = new THREE.BoxGeometry(
        width - LEFT_BAR_SIZE * 2,
        height - LEFT_BAR_SIZE * 2,
        0.1
      );
      const glassMesh = new THREE.Mesh(glassGemotery, glassMaterial);
      glassMesh.castShadow = true;
      glassMesh.name = "glass";
      const glassGroup = new THREE.Group();
      glassGroup.position.set(this.left, this.top, 0);
      glassMesh.position.set(width / 2, -height / 2 - LEFT_BAR_SIZE, 0);
      glassGroup.add(glassMesh);
      glassMesh.userData.disableUpdate = true;
      this.group.add(glassGroup);

      loader.load(
        "fonts/optimer_regular.typeface.json",
        // onLoad callback
        (font) => {
          const textAttr = {
            font,
            // 文本大小
            color: '#000000',
            size: 4,
            weight: 'bold',
            // 文本厚度
            height: 0.1,
            // 文本曲线上点的数量, 默认12
            curveSegments: 12,
            // 是否开启斜角
            bevelEnabled: false,
            // 斜角的深度
            bevelThickness: 0,
            // 表示斜角与原始文本轮廓之间的延伸距离
            bevelSize: 1,
            bevelOffset: 1,
            // 斜角的分段数，默认值3
            bevelSegments: 0,
          };
          const materials = [
            new THREE.MeshBasicMaterial({
              color: 0x666666,
            }),
          ];
          const textGroup = new THREE.Group();
          let geometry = new TextGeometry("SB1", textAttr);
          let textMesh = new THREE.Mesh(geometry, materials);
          textMesh.position.set(74, -170, 0);
          textGroup.add(textMesh);

          textAttr.weight = "normal";
          geometry = new TextGeometry("6+27AR+6", textAttr);
          textMesh = new THREE.Mesh(geometry, materials);
          textMesh.position.set(64, -176, 0);
          textGroup.add(textMesh);

          textGroup.position.set(this.left, this.top, 0);
          this.group.add(textGroup);
          renderer.render();
        }
      );
    }

    // 分别创建四个边框，每个边框可以自己的基础model
    this.topBar = new Top({
      height: TOP_BAR_SIZE,
      width,
      left,
      top,
      color,
    });
    this.rightBar = new Right({
      height,
      width: RIGHT_BAR_SIZE,
      left: this.width + left - RIGHT_BAR_SIZE,
      top,
      color,
      type,
    });
    this.leftBar = new Left({
      height,
      width: LEFT_BAR_SIZE,
      left,
      top,
      color,
      type,
    });
    this.bottomBar = new Bottom({
      width,
      height: BOTTOM_BAR_SIZE,
      top: this.height + top - BOTTOM_BAR_SIZE,
      left,
      color,
    });
    createRaycaster(
      [this.group],
      (
        result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
      ) => {
        // 只有当点击的是把手的时候才执行动画
        if (result[0].object.name === "handle") {
          const { type, isOpen } = this;
          const begin = type === "left" ? 0 : 0;
          const end = type === "left" ? 154 : -120;
          const targetValue = isOpen ? begin : end;
          const tween = new TWEEN.Tween(this.group.position)
            .to({ x: targetValue }, 500)
            .start();
          let isEnd = false;
          tween.onComplete(() => {
            isEnd = true;
            this.isOpen = !this.isOpen;
          });

          const animation = () => {
            tween.update();
            renderer.render();
            if (!isEnd) {
              requestAnimationFrame(animation);
            }
          };
          animation();
        }
      },
      (
        result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
      ) => {
        if (result.length > 0 && result[0].object.name === "handle") {
          document.body.style.cursor = "pointer";
          setTimeout(() => {
            document.body.style.cursor = "pointer";
          }, 0);
        } else {
          document.body.style.cursor = "default";
        }
      }
    );
    this.init();
  }

  updateMaterial = (obj: ValueObj) => {
    this.topBar.updateMaterial(obj);
    this.leftBar.updateMaterial(obj);
    this.rightBar.updateMaterial(obj);
    this.bottomBar.updateMaterial(obj);
  };
}

export default Frame;
