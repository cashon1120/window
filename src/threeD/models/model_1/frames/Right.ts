import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";

/**
 * 框架右侧,这里加了一个把手
 */
class RightFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 50;
    super(params);

    const {
      height,
      width = config.outBarSize,
      color = "#4E646E",
      depth = config.outBarDepth,
    } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.castShadow = true
    mesh.receiveShadow = true;

    this.innerGroup.add(mesh);

    this.init();
  }

  setMapAttribute = (map: THREE.Texture) => {
    map.offset.set(0, 0.5);
    map.repeat.set(0.002, 0.002);
    return map;
  };
}

export default RightFrame;
