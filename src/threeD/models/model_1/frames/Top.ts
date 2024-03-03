/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";

/**
 * 框架顶部
 */
class TopFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 50;
    params.align = params.align || "left-top";
    super(params);
    const { height = config.outBarSize, depth = config.outBarDepth, width, color = "#4E646E" } = params;
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

export default TopFrame;
