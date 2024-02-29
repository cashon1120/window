/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface ControlsProps {
  minDistance?: number;
  maxDistance?: number;
  // 是否开启阻尼效果，默认为开启
  enableDamping?: boolean;
  // 阻尼惯性，默认0.05
  dampingFactor?: number;
}

interface Params {
  // 渲染容器的ID，注意是ID
  container: string;
  // 渲染数据, 也不是非得要传，可以在其它地方手动调用add()方法添加模型到场景
  data?: Data;
  // 缩放比例，考虑到现实中应该是以毫米为单位，那样太大，这里给一个缩放比例
  scale?: number;
  // 是否显示辅助线
  showHelper?: {
    color?: string;
  };
  // 是否显示GUI
  showGui?: boolean;
  // 是否显示性能查看器
  showStats?: boolean;
  // 控制器相关配置
  controls?: ControlsProps;
  // 是否禁用自动设置相机位置
  disableAutoSetCameraPosition?: boolean;
}

class Three {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  containerDom: HTMLElement | null;
  mainGroup: THREE.Group;
  controls: OrbitControls | undefined = undefined;
  stats: Stats | null = null;
  guiInstance: Gui | undefined = undefined;
  // 保存所有根据传入的数据渲染的3D对象，不包括灯光，辅助线等，以后可能会有用；
  objects: ThreeDObject;
  scale: number = 1;
  controlsProps: Required<ControlsProps> = {
    minDistance: 100,
    maxDistance: 500,
    enableDamping: true,
    dampingFactor: 0.05,
  };
  disableAutoSetCameraPosition: boolean;
  // 是否设置相机位置，只需要在第一次创建的时候设置
  isSetCameraPosition: boolean = false;
  constructor(params: Params) {
    const {
      data,
      showGui,
      controls,
      container,
      showStats,
      showHelper,
      scale = 1,
      disableAutoSetCameraPosition = false,
    } = params;
    this.containerDom = document.getElementById(container);
    if (!this.containerDom) {
      throw new Error(`${container} 容器不存在`);
    }
    const { offsetWidth, offsetHeight } = this.containerDom;
    this.controlsProps = {
      ...this.controlsProps,
      ...controls,
    };
    this.disableAutoSetCameraPosition = disableAutoSetCameraPosition;
    this.objects = {};
    this.scale = scale;
    this.scene = new THREE.Scene();
    this.mainGroup = new THREE.Group();
    this.camera = new THREE.PerspectiveCamera(
      45,
      offsetWidth / offsetHeight,
      1,
      10000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 是否抗锯齿
      alpha: true, // 是否可以设置背景色透明
      precision: "mediump", // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true, // 表示是否可以设置像素深度（用来度量图像的分辨率）
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(offsetWidth, offsetHeight);
    // 设置渲染器，允许光源阴影渲染
    renderer.shadowMap.enabled = true;
    this.containerDom.appendChild(renderer.domElement);
    this.renderer = renderer;

    const { scene, camera } = this;
    // 初始化性能监视插件
    if (showStats) {
      this.stats = new Stats();
      this.containerDom.appendChild(this.stats.dom);
    }

    // 初始化gui调试器
    if (showGui) {
      this.guiInstance = new Gui({
        renderer,
        scene,
        camera,
      });
    }

    // 显示相关辅助信息(这里包含坐标轴和平面辅助线)
    if (showHelper) {
      new Helper({
        scene,
        guiInstance: this.guiInstance,
        color: showHelper.color,
      });
    }

    // 创建所有模型,注意这里的位置，必须在render, scene创建之后执行
    this.createModel(data);
    this.addEventListener();
  }

  /**
   * 初始化相机位置, isSetCameraPosition 控制只设置一次
   */
  private initCameraAndControls = (x: number, y: number) => {
    const {
      controlsProps,
      renderer,
      containerDom,
      disableAutoSetCameraPosition,
      isSetCameraPosition,
    } = this;
    if (isSetCameraPosition) {
      return;
    }
    this.isSetCameraPosition = true;
    if (disableAutoSetCameraPosition) {
      this.camera.position.set(0, 0, 200);
    } else {
      // 这里按宽高比例设置相机在Z轴的位置,保证能完全看到模型
      const { offsetWidth, offsetHeight } = containerDom as HTMLElement;
      // 这个数字是试出来的，估计不怎么好，后面有机会再找更好的计算方法
      const base = 1500;
      const z = Math.max(
        (x / offsetWidth) * base,
        (Math.abs(y) / offsetHeight) * base
      );
      this.camera.position.set(0, 0, z);
    }
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    const { enableDamping, dampingFactor, minDistance, maxDistance } =
      controlsProps;
    this.controls.enableDamping = enableDamping;
    this.controls.dampingFactor = dampingFactor;
    this.controls.screenSpacePanning = false; // 不支持空格鼠标操作
    this.controls.minDistance = minDistance;
    this.controls.maxDistance = maxDistance;
    this.render();
  };

  /**
   * 把所有内容显示到正中间，并根据内容的宽高设置灯光及其位置
   */
  private resetMainGroup = () => {
    const box = new THREE.Box3();
    this.mainGroup.scale.set(this.scale, this.scale, this.scale);
    const { max, min } = box.expandByObject(this.mainGroup);
    const offsetX = -max.x / 2;
    const offsetY = -min.y / 2;
    this.mainGroup.translateX(offsetX);
    this.mainGroup.translateY(offsetY);
    // 创建相关尺寸
    createSize(this);
    // 创建灯光，需要在mainGroup位置调整之后调用，translate不会影响max, min的值，其中min.y是负数
    createLight(this, max.x, min.y);
    this.initCameraAndControls(max.x, min.y);
  };

  /**
   * 渲染动画
   */
  private render = () => {
    const { renderer, scene, camera, stats, controls } = this;
    stats?.update();
    controls?.update();
    renderer.render(scene, camera);
    requestAnimationFrame(this.render);
  };

  /**
   * 绑定一些事件,这里是窗口大小变化事件
   */
  private addEventListener = () => {
    const { renderer, camera, containerDom } = this;
    window.addEventListener("resize", () => {
      if (!containerDom) {
        return;
      }
      const { offsetWidth, offsetHeight } = containerDom;
      renderer.setSize(offsetWidth, offsetHeight);
      camera.aspect = offsetWidth / offsetHeight;
      camera.updateProjectionMatrix();
    });
  };

  /**
   * 根据传入的数据创建模型
   */
  createModel = (data?: Data) => {
    this.mainGroup = new THREE.Group();
    this.mainGroup.name = "MainGroup";
    this.scene.add(this.mainGroup);
    if (data) {
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
    }
    this.resetMainGroup();
  };

  /**
   * 更新材质或颜色
   */
  updateMaterials = (obj: ValueObj) => {
    const { objects } = this;
    Object.keys(objects).forEach((key: string) => {
      objects[key].updateMaterial && objects[key].updateMaterial(obj);
    });
  };

  /**
   * 添加对象到场景
   */
  add = (data: THREE.Object3D) => {
    this.scene.add(data);
  };

  /**
   * 清空场景，这里需要删除GPU中的缓存，不然可能出造成内存泄漏
   */
  clear = () => {
    this.scene.traverse((object: any) => {
      try {
        if (object.type === "Mesh") {
          object.geometry &&
            object.geometry.dispose &&
            object.geometry.dispose();
          object.material &&
            object.material.dispose &&
            object.material.dispose();
        }
      } catch (e) {
        throw new Error("删除缓存出错");
      }
    });
    for (let i = 0; i < this.scene.children.length; i++) {
      const obj = this.scene.children[i];
      if (!obj.userData.disableRemove) {
        this.scene.remove(obj);
      }
    }
    this.objects = {};
  };
}

export default Three;
