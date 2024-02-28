import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import Gui from "./common/gui";
import Helper from "./common/helper";

import { ValueObj, Model, ThreeDObject } from "./types";

interface Params {
  // 渲染容器的ID，注意是ID
  container: string;
  showHelper?: {
    color?: string;
  };
  showGui?: boolean;
  showStats?: boolean;
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
  objects: ThreeDObject; // 保存所有3d对象
  constructor(params: Params) {
    const { container, showHelper, showStats, showGui } = params;
    this.containerDom = document.getElementById(container);
    if (!this.containerDom) {
      throw new Error(`${container} 容器不存在`);
    }
    const { offsetWidth: width, offsetHeight: height } = this.containerDom;
    this.objects = {};
    this.scene = new THREE.Scene();
    this.mainGroup = new THREE.Group();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否抗锯齿
      alpha: true, // 是否可以设置背景色透明
      precision: "mediump", // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true, // 表示是否可以设置像素深度（用来度量图像的分辨率）
      // preserveDrawingBuffer: false, // 是否保存绘图缓冲
      // physicallyCorrectLights: true, // 是否开启物理光照
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // 设置渲染器，允许光源阴影渲染
    renderer.shadowMap.enabled = true;
    this.containerDom.appendChild(renderer.domElement);
    this.scene.add(this.mainGroup);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.renderer = renderer;
    const { scene, camera } = this;

    // 性能监视插件
    if (showStats) {
      this.stats = new Stats();
      this.containerDom.appendChild(this.stats.dom);
    }

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
        guiInstance: this.guiInstance,
        color: showHelper.color
      });
    }

    this.addEventListener();
    this.render();
  }

  // 更新材质或颜色
  updateMaterials = (obj: ValueObj) => {
    const { objects } = this;
    Object.keys(objects).forEach((key: string) => {
      objects[key].updateMaterial && objects[key].updateMaterial(obj);
    });
    this.render();
  };

  saveObjects = (model: Model, key: string) => {
    this.objects[key] = model;
  };

  /**
   * 渲染
   */
  render = () => {
    const { renderer, scene, camera, stats } = this;
    renderer.render(scene, camera);
    stats && stats.update();
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
    const { renderer, camera, render, containerDom, controls, stats } = this;
    window.addEventListener("resize", () => {
      if (!containerDom) {
        return;
      }
      const { offsetWidth, offsetHeight } = containerDom;
      renderer.setSize(offsetWidth, offsetHeight);
      camera.aspect = offsetWidth / offsetHeight;
      camera.updateProjectionMatrix();
      render();
    });

    controls.addEventListener("change", () => {
      stats && stats.update();
      render();
    });
  };
}

export default Three;
