import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { scene, camera, renderer } from "../common";
import { getSize } from "../utils";

type AlignType = "right" | "top" | "left" | "bottom" | "center";

interface Props {
  width: number;
  height: number;
  depth: number;
  color?: string;
  group?: THREE.Group;
  x?: number;
  y?: number;
  z?: number;
  meshs?: THREE.Mesh[]
  align?: AlignType;
}

interface Params {
  type: "right" | "top" | "left" | "bottom";
  value: number;
  time?: number;
}

class Bar {
  innerGroup: THREE.Group;
  group: THREE.Group;
  parentGroup: THREE.Group;
  width: number;
  height: number;
  depth: number;
  align?: AlignType;
  x: number;
  y: number;
  z: number;
  constructor(params: Props) {
    const {
      width,
      height,
      depth = 3,
      color = "#eee",
      x = 0,
      y = 0,
      z = 0,
      meshs,
      group,
      align = "center",
    } = params;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.x = x;
    this.y = y;
    this.z = z;
    this.align = align;
    this.parentGroup = group || new THREE.Group();
    this.group = new THREE.Group();
    // this.init(meshs, color)
  }
  init(meshs?: THREE.Mesh[], color?: string) {
    if (meshs) {
      meshs.forEach(mesh => {
        this.group.add(mesh)
      })
    } else {
      const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
      const material = new THREE.MeshPhysicalMaterial({
        color,
        //渲染为线条
        wireframe: false,
        metalness: 0.5,
        roughness: 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.group.add(mesh);
    }

    this.group.position.set(this.x, this.y, this.z);

    switch (this.align) {
      case "top":
        this.group.translateY(-this.height / 2);
        break;
      case "right":
        this.group.translateX(-this.width / 2);
        break;
      case "bottom":
        console.log(123123)
        this.group.children.forEach((mesh: any) => {
          console.log(mesh)
          const size = getSize(mesh);
          console.log(size)
          // mesh.translateY(size.y / 2);
          mesh.scale.set(1, 2, 1)
        })
        break;
      case "left":
        this.group.translateX(this.width / 2);
        break;
    }
    if (this.parentGroup) {
      this.parentGroup.add(this.group);
    }
    return this;
  }
  translate = (params: Params) => {
    const { type, value, time = 300 } = params;
    const target = this.group;
    const currentY = target.position.y;
    const isHorizontal = type === "right" || type === "left";
    const translateType = isHorizontal ? "x" : "y";
    let targetValue = value;
    // if (type === "bottom" && value < 0) {
    //   targetValue = value + currentY;
    // }
    console.log(target.position);
    console.log(value);
    const tween = new TWEEN.Tween(target.position)
      .to({ [translateType]: targetValue }, time)
      .start();
    let isEnd = false;
    tween.onComplete(() => {
      isEnd = true;
    });
    tween.onComplete;
    const render = () => {
      tween.update();
      renderer.render(scene, camera);
      if (!isEnd) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
  transform = (params: Params) => {
    const { type, value, time = 300 } = params;
    if (!type) {
      throw new Error("请输入变化类型, 如: left | right | top | bottom");
    }
    const target = this.group;
    const _height = this.height;
    const _width = this.width;
    const isHorizontal = type === "right" || type === "left";
    const isVertical = type === "top" || type === "bottom";
    let positionTween: any;
    if (type === "top") {
      positionTween = new TWEEN.Tween(target.position)
        .to({ y: value / 2 }, time)
        .start();
      this.height = value;
    }

    if (type === "right") {
      positionTween = new TWEEN.Tween(target.position)
        .to({ x: value / 2 }, time)
        .start();
      this.width = value;
    }

    if (type === "bottom") {
      const targetValue = target.position.y - (value - this.height) / 2;
      positionTween = new TWEEN.Tween(target.position)
        .to({ y: targetValue }, time)
        .start();
      this.height = value;
    }

    if (type === "left") {
      const targetValue = target.position.x - (value - this.width) / 2;
      positionTween = new TWEEN.Tween(target.position)
        .to({ x: targetValue }, time)
        .start();
    }

    if (isHorizontal) {
      this.width = value;
    }
    if (isVertical) {
      this.height = value;
    }

    const scaleType = isHorizontal ? "x" : "y";
    const tween = new TWEEN.Tween(target.scale)
      .to({ [scaleType]: value / (isHorizontal ? _width : _height) }, time)
      .start();
    let isEnd = false;
    tween.onComplete(() => {
      isEnd = true;
    });
    const render = () => {
      tween.update();
      positionTween.update();
      renderer.render(scene, camera);
      if (!isEnd) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default Bar;
