import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import Gui from "./common/gui";
import Helper from "./common/helper";
import { Data } from "../types";
import * as Models from "./models";
import createLight from "./lights";
import createSize from "./tools/size";
import { ValueObj, ThreeDObject } from "./types";

interface Params {
  // 渲染容器的ID，注意是ID
  data: Data;
  container: string;
  showHelper?: {
    color?: string;
  };
  showGui?: boolean;
  showStats?: boolean;
  controls?: {
    minDistance?: number;
    maxDistance?: number;
  };
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
  objects: ThreeDObject; // 保存所有根据传入的数据渲染的3D对象，不包括灯光，辅助线等，以后可能会有用；
  constructor(params: Params) {
    const { container, showHelper, showStats, showGui, data, controls } =
      params;
    this.containerDom = document.getElementById(container);
    if (!this.containerDom) {
      throw new Error(`${container} 容器不存在`);
    }
    const { offsetWidth, offsetHeight } = this.containerDom;
    this.objects = {};
    this.scene = new THREE.Scene();
    this.mainGroup = new THREE.Group();
    this.camera = new THREE.PerspectiveCamera(
      45,
      offsetWidth / offsetHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, (controls?.minDistance || 100) + 300);
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否抗锯齿
      alpha: true, // 是否可以设置背景色透明
      precision: "mediump", // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true, // 表示是否可以设置像素深度（用来度量图像的分辨率）
      // preserveDrawingBuffer: false, // 是否保存绘图缓冲
      // physicallyCorrectLights: true, // 是否开启物理光照
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(offsetWidth, offsetHeight);
    // 设置渲染器，允许光源阴影渲染
    renderer.shadowMap.enabled = true;
    this.containerDom.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.renderer = renderer;

    // 注意这里的位置，后面需要优化
    this.controls.minDistance = controls?.minDistance || 100;
    this.controls.maxDistance = controls?.maxDistance || 1000;

    // 创建所有模型,注意这里的位置，必须在render, scene, 创建之后执行
    this.createModel(data);

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
        color: showHelper.color,
      });
    }

    // 创建相关尺寸
    createSize(this);

    // 创建一系列灯光，
    createLight(this);
    this.addEventListener();
    this.render();
  }

  /**
   * 创建模型
   */
  createModel = (data: Data) => {
    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);
    Object.keys(data).forEach((key) => {
      const modelName = data[key].model;
      if (Models[modelName]) {
        this.objects[key] = new Models[modelName]({
          ...data[key].attribute,
          threeInstance: this,
        });
      } else {
        throw new Error(`没有找到 ${modelName} 模型`);
      }
    });
    this.resetMainGroup();
    this.render();
  };

  resetMainGroup = () => {
    const box = new THREE.Box3();
    const scale = 0.1
    this.mainGroup.scale.set(scale, scale, scale);
    const { max, min } = box.expandByObject(this.mainGroup);
    const offsetX = -max.x / 2;
    const offsetY = -min.y / 2;
    this.mainGroup.translateX(offsetX);
    this.mainGroup.translateY(offsetY);
  };

  // 更新材质或颜色
  updateMaterials = (obj: ValueObj) => {
    const { objects } = this;
    Object.keys(objects).forEach((key: string) => {
      objects[key].updateMaterial && objects[key].updateMaterial(obj);
    });
    this.render();
  };

  /**
   * 渲染
   */
  render = () => {
    const { renderer, scene, camera, stats } = this;
    stats && stats.update();
    renderer.render(scene, camera);
  };

  /**
   * 添加对象到场景
   */
  add = (data: THREE.Object3D) => {
    this.scene.add(data);
  };

  /**
   * 清空场景
   */
  clear = () => {
    for (let i = 0; i < this.scene.children.length; i++) {
      const obj = this.scene.children[i];
      if (!obj.userData.disableRemove) {
        this.scene.remove(obj);
      }
    }
    this.objects = {};
    // this.renderer.clear();
    this.render();
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
