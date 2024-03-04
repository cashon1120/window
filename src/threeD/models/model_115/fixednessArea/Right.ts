import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";
const { outBarDepth, grooveDepth, grooveSize } = config;

/**
 * 框架右侧,这里加了一个把手
 */
class RightFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 50;
    super(params);

    const { height, width, color = "#4E646E" } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });

    let geometry = new THREE.BoxGeometry(
      width - grooveSize,
      height - grooveSize * 2,
      outBarDepth
    );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.translateX(-grooveSize * 0.5);
    this.innerGroup.add(mesh);

    geometry = new THREE.BoxGeometry(width, height, grooveDepth);
    mesh = new THREE.Mesh(geometry, material);
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
