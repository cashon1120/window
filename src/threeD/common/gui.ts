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

// 这里来切换是否要显示gui
// const gui: GUI | null = null;
const gui: GUI | null = new GUI();

// 位置控制
export const guiPosition = (params: PositionProps) => {
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
export const guiColor = (params: ColorProps) => {
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
export const guiBoolean = (params: BooleanProps) => {
  const { folder, name = "辅助工具", defaultValue = false, onChange } = params;
  const obj = {
    bool: defaultValue,
  };
  folder
    .add(obj, "bool")
    .name(name)
    .onChange((value: boolean) => {
      onChange && onChange(value);
      reRender();
    });
};

let _renderer: THREE.Renderer, _scene: THREE.Scene, _camera: THREE.Camera;

const reRender = () => {
  _renderer.render(_scene, _camera);
};

export const createGui = (
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.Camera
) => {
  _renderer = renderer;
  _camera = camera;
  _scene = scene;
  if (gui) {
    //改变交互界面style属性
    gui.domElement.style.right = "0px";
    gui.domElement.style.width = "300px";
    gui.onChange(() => {
      renderer.render(scene, camera);
    });
  }
};

export default gui;
