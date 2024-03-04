/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";

const { outBarDepth, grooveDepth, grooveSize } = config;
/**
 * 框架顶部
 */
class TopFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 50;
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
      width - grooveSize * 2,
      height- grooveSize,
      outBarDepth
    );
 
    mesh = new THREE.Mesh(geometry, material);
    mesh.translateY(-grooveSize * 0.5);
    mesh.receiveShadow = true;
    this.innerGroup.add(mesh);
    this.init();
  }
}

export default TopFrame;
