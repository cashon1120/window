import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";
const { outBarDepth, grooveDepth, grooveSize } = config;

/**
 * 框架左侧
 */
class LeftFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 50;
    params.align = params.align || "left-top";
    super(params);
    const { height, width, color = "#4E646E" } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });

    let geometry = new THREE.BoxGeometry(width, height, grooveDepth);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    this.innerGroup.add(mesh);

    geometry = new THREE.BoxGeometry(
      width - grooveSize,
      height - grooveSize * 2,
      outBarDepth
    );
    mesh = new THREE.Mesh(geometry, material);
    mesh.translateX(grooveSize * 0.5);
    mesh.receiveShadow = true;
    this.innerGroup.add(mesh);

    this.init();
  }
}

export default LeftFrame;
