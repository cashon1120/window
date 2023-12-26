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
    // 为了两边不重叠，稍微短一点
    const geometry2 = new THREE.BoxGeometry(width - 0.05, 1, 5);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      wireframe: false,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2); 
    mesh2.translateY(-3)
    this.innerGroup.add(mesh);
    this.innerGroup.add(mesh2);
    this.init()
  }
}

export default TopFrame;
