import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import { extrudeSettings } from "./config";
import { createRoundedRect, createRoundedGeometry } from "@/utils/roundedRect";
/**
 * 框架左侧
 */
class LeftFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 5;
    params.align = params.align || "left-top";
    super(params);
    const { height, width = 5, color = "#4E646E" } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });

    const shape = createRoundedRect(
      0,
      0,
      width - extrudeSettings.bevelSize,
      height - extrudeSettings.bevelSize * 3,
      0.2
    );
    const geometry = createRoundedGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      -width / 2 + extrudeSettings.bevelSize,
      -height / 2 + extrudeSettings.bevelSize * 2,
      -extrudeSettings.depth / 2
    );
    this.innerGroup.add(mesh);

    // 玻璃的那个胶套, 为了两边不重叠，稍微短一点
    const geometry2 = new THREE.BoxGeometry(2, height - 0.05, 1);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: "#000",
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.translateX(3);
    this.innerGroup.add(mesh2);
    this.init();
  }
}

export default LeftFrame;
