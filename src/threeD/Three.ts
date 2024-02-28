import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import Gui from "./common/gui";
import Helper from "./common/helper";

import {
  BottomFrame,
  TopFrame,
  LeftFrame,
  RightFrame,
  NormalBar,
  Window,
} from "./models";
import { ValueObj } from "@/types";

interface Params {
  // 渲染容易的ID，注意是ID
  container: string;
  showHelper?: boolean;
  showGui?: boolean;
  showStats?: boolean;
}
export type Model =
  | BottomFrame
  | TopFrame
  | LeftFrame
  | RightFrame
  | NormalBar
  | Window;
export interface ThreeDObject {
  [key: string]: Model;
}

class Three {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  containerDom: HTMLElement | null;
  mainGroup: THREE.Group;
  controls: OrbitControls;
  stats: Stats | null = null;
  guiInstance: Gui | undefined = undefined;
  Objects: ThreeDObject;
  constructor(params: Params) {
    const { container, showHelper, showStats, showGui } = params;

    this.containerDom = document.getElementById(container);
    if (!this.containerDom) {
      throw new Error(`${container} 容器不存在`);
    }
    const width = this.containerDom.offsetWidth;
    const height = this.containerDom.offsetHeight;
    this.scene = new THREE.Scene();
    this.mainGroup = new THREE.Group();
    this.Objects = {};
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    // 性能监视插件
    if (showStats) {
      this.stats = new Stats();
      this.containerDom.appendChild(this.stats.dom);
    }

    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否抗锯齿
      alpha: true, // 是否可以设置背景色透明
      precision: "mediump", // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true, // 表示是否可以设置像素深度（用来度量图像的分辨率）
      // preserveDrawingBuffer: false, // 是否保存绘图缓冲
      // physicallyCorrectLights: true, // 是否开启物理光照
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    // 设置渲染器，允许光源阴影渲染
    this.renderer.shadowMap.enabled = true;
    this.containerDom.appendChild(this.renderer.domElement);
    this.scene.add(this.mainGroup);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const {renderer,scene, camera} = this
    // 显示gui
    if (showGui) {
      this.guiInstance = new Gui({
        renderer,
        scene,
        camera,
      });
    }

    // 显示相关辅助信息
    if (showHelper) {
      new Helper({
        scene,
        guiInstance: this.guiInstance 
      });
    }

    this.addEventListener();
    this.render();
  }

  // 更新颜色
  updateMaterials = (obj: ValueObj) => {
    const { Objects } = this;
    Object.keys(Objects).forEach((key: string) => {
      Objects[key].updateMaterial && Objects[key].updateMaterial(obj);
    });
  };

  /**
   * 重新渲染
   */
  render = () => {
    this.renderer.render(this.scene, this.camera);
    this.stats && this.stats.update();
  };

  /**
   * 添加对象到场景
   */
  add = (data: THREE.Object3D) => {
    this.scene.add(data);
  };

  /**
   * 绑定一些事件
   */
  addEventListener = () => {
    window.addEventListener("resize", () => {
      if (!this.containerDom) {
        return;
      }
      const width = this.containerDom.offsetWidth;
      const height = this.containerDom.offsetHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.render();
    });

    this.controls.addEventListener("change", () => {
      this.stats && this.stats.update();
      this.render();
    });
  };
}

export default Three;
