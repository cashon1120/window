import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";

/**
 * 框架底部，可能会有轨道之类的元素
 */
class BottomFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 5;
    super(params);
    const { height = 5, width, depth = 10, color = "#eee" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      wireframe: false,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
    this.init();
  }
}

export default BottomFrame;
