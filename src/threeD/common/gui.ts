// 引入dat.gui.js的一个类GUI
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
interface PositionProps {
  mesh: THREE.Mesh | THREE.Camera | THREE.Light;
  folder: GUI;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

interface ColorProps {
  mesh: THREE.Mesh;
  folder: GUI;
  name?: string;
  defaultValue?: number | string;
  onChange?: (value: number | string) => void;
}

interface BooleanProps {
  folder: GUI;
  name?: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

interface GuiParams {
  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
}

/**
 * 创建Gui，这里注意和GUI的大小写区别
 */
class Gui {
  gui: GUI;
  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  constructor(params: GuiParams) {
    const { renderer, scene, camera } = params;
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.gui = new GUI();
    this.init();
  }

  init = () => {
    const { renderer, scene, camera, gui } = this;
    gui.domElement.style.right = "0px";
    gui.domElement.style.width = "300px";
    gui.onChange(() => {
      renderer.render(scene, camera);
    });
  };

  // 位置控制
  guiPosition = (params: PositionProps) => {
    const {
      mesh,
      folder,
      name = "",
      min = 0,
      max = 100,
      step = 1,
      onChange = () => {},
    } = params;
    folder
      .add(mesh.position, "x", min, max)
      .name(`${name} x 坐标`)
      .step(step)
      .onChange(onChange);
    folder
      .add(mesh.position, "y", min, max)
      .name(`${name} y 坐标`)
      .step(step)
      .onChange(onChange);
    folder
      .add(mesh.position, "z", min, max)
      .name(`${name} z 坐标`)
      .step(step)
      .onChange(onChange);
  };

  // 颜色控制
  guiColor = (params: ColorProps) => {
    const {
      mesh,
      folder,
      name = "颜色",
      defaultValue = 0xffffff,
      onChange,
    } = params;
    const obj = {
      color: defaultValue,
    };
    folder
      .addColor(obj, "color")
      .name(name)
      .onChange((value: number | string) => {
        if (onChange) {
          onChange(value);
          return;
        }
        (mesh.material as THREE.LineBasicMaterial).color.set(value);
      });
  };

  // 布尔控制
  guiBoolean = (params: BooleanProps) => {
    const {
      folder,
      name = "辅助工具",
      defaultValue = false,
      onChange,
    } = params;
    const obj = {
      bool: defaultValue,
    };
    folder
      .add(obj, "bool")
      .name(name)
      .onChange((value: boolean) => {
        onChange && onChange(value);
        this.render();
      });
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
}

export default Gui;
