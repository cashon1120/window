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
    const { height = 5, width, depth = 11, color = "#4E646E" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
    this.init()
  }
}

export default TopFrame;
