import * as THREE from "three";
import Bar, { BarProps } from "../basicModel/Bar";
import { transformPosition } from "@/utils/index";

/**
 * 纵梁
 */
class VerticalBar extends Bar {
  constructor(params: BarProps) {
    const {
      left,
      top,
      height = 10,
      width = 10,
      depth = 10,
      color = "#e09647",
    } = params;
    params.width = params.width || 5;
    const position = transformPosition({ left, top, height, width });
    const newParams = {
      ...params,
      x: position.x,
      y: position.y,
    };
    super(newParams);
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
    this.init();
  }
}

export default VerticalBar;
