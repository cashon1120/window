import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import stats from "./stats";

// 相机控件
const initOrbitContros = (renderer: THREE.Renderer, scene: THREE.Scene, camera: THREE.Camera, ) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    // 添加阻尼效果
    // controls.enableDamping = true
    controls.addEventListener("change", () => {
      stats.update();
      renderer.render(scene, camera);
    });
    return controls
}

export default initOrbitContros