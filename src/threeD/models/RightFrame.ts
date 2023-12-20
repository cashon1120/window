import * as THREE from "three";
import Bar, { BarProps } from "../basicModel/Bar";


/**
 * 框架右侧
 */
class RightFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 5;
    super(params);
    const { height, width = 5, depth = 10, color = "#eee" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      wireframe: true,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
    this.init();
  }
}

export default RightFrame;
