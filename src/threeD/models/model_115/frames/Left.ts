import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";

/**
 * 框架左侧
 */
class LeftFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 50;
    params.align = params.align || "left-top";
    super(params);
    const { height, width = config.outBarSize, color = "#4E646E", depth = config.outBarDepth, } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });

    const geometry = new THREE.BoxGeometry(width, height,depth);
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.castShadow = true
    mesh.receiveShadow = true

    this.innerGroup.add(mesh);


    this.init();
  }
}

export default LeftFrame;
