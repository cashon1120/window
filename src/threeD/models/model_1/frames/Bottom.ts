import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";

/**
 * 框架底部，可能会有轨道之类的元素
 */
class BottomFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 5;
    super(params);
    const {
      height = config.outBarSize,
      depth = config.outBarDepth,
      width,
      color = "#4E646E",
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
}

export default BottomFrame;
