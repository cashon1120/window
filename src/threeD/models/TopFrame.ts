import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";

/**
 * 框架顶部
*/
class TopFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 5
    params.align = params.align || 'left-top'
    super(params);
    const { height = 5, width, depth = 10, color = "#4E646E" } = params;
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
    this.init()
  }
}

export default TopFrame;
