import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface ControlProps {
  camera: THREE.Camera;
  renderer: THREE.Renderer;
  enableDamping: boolean;
  dampingFactor: number;
  minDistance?: number;
  maxDistance?: number;
}

// 相机控件
const createOrbitContros = (params: ControlProps) => {
  const {
    camera,
    renderer,
    enableDamping,
    dampingFactor,
    minDistance = 100,
    maxDistance = 500,
  } = params;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = enableDamping;
  controls.dampingFactor = dampingFactor;
  controls.screenSpacePanning = false; // 不支持空格鼠标操作
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.addEventListener("change", () => {
    // change事件，暂时没有
  });
  return controls;
};

export default createOrbitContros;
