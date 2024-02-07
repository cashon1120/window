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
    const { height = 5, width, depth = 5, color = "#4E646E" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);

    // 玻璃的那个胶套, 为了两边不重叠，稍微短一点
    const geometry2 = new THREE.BoxGeometry(width - 0.05, 2, 1);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#000',
    });
    const mesh2 = new THREE.Mesh(geometry2, material2); 
    mesh2.translateY(-3)
    this.innerGroup.add(mesh2);
    
    this.init()
  }
}

export default TopFrame;
