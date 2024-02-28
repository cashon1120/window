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
    const { height = 50, width, depth = 110, color = "#4E646E" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true
    // mesh.receiveShadow = true
    this.innerGroup.add(mesh);
    this.init()
  }
  setMapAttribute = (map: THREE.Texture) => {
    map.offset.set(1, 1);
    map.repeat.set(100, 30);
    return map
  }
}

export default TopFrame;
