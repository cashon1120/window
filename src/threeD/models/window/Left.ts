import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";

/**
 * 框架左侧
 */
class LeftFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 5;
    params.align = params.align || "left-top";
    super(params);
    const { height, width = 5, depth = 5, color = "#4E646E" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
    
    // 玻璃的那个胶套, 为了两边不重叠，稍微短一点
    const geometry2 = new THREE.BoxGeometry(2, height - 0.05, 1);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: "#000",
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.translateX(3);
    this.innerGroup.add(mesh2);
    this.init();
  }
}

export default LeftFrame;
