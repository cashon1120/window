import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
// 引入gltf模型加载库GLTFLoader.js
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// const loader = new GLTFLoader();

/**
 * 框架右侧
 */
class RightFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 5;
    super(params);
    const { height, width = 5, depth = 10, color = "#4E646E" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      // wireframe: true,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    // 这里是加载模型的代码
    // loader.load("train.gltf", (gltf) => {
    //   gltf.scene.rotateZ(Math.PI / 2)
    //   this.innerGroup.add(gltf.scene);
    // });
    this.innerGroup.add(mesh);
    this.init();
  }
}

export default RightFrame;
