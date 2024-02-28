/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import { extrudeSettings } from "./config";
import { createRoundedRect, createRoundedGeometry } from "@/utils/roundedRect";

/**
 * 框架顶部
 */
class TopFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 50;
    params.align = params.align || "left-top";
    super(params);
    const { height = 50, width, color = "#4E646E" } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    const shape = createRoundedRect(
      0,
      0,
      width - extrudeSettings.bevelSize,
      height,
      0.2
    );

    const geometry = createRoundedGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.position.set(
      -width / 2 + extrudeSettings.bevelSize,
      -height / 2 - extrudeSettings.bevelSize,
      -extrudeSettings.depth / 2
    );
    this.innerGroup.add(mesh);

    // 玻璃的那个胶套, 为了两边不重叠，稍微短一点
    const geometry2 = new THREE.BoxGeometry(width - 0.05, 2, 1);
    const material2 = new THREE.MeshPhongMaterial({
      color: "#000",
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.translateY(-4);
    mesh2.userData.disableUpdate = true;
    this.innerGroup.add(mesh2);
    this.init();
  }
}

export default TopFrame;
