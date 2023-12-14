import * as THREE from "three";
import Bar, { AlignType } from "../basicModel/Bar";
import { transformPosition } from "../utils/index";

interface Props {
  left: number;
  top: number;
  width?: number; // 模型的宽度
  height?: number; // 模型的高度
  color?: string;
  group?: THREE.Group;
  depth?: number; // 模型的厚度
  align?: AlignType;
}
/**
 * 横梁
 */
class HorzontalBar extends Bar {
  constructor(params: Props) {
    const {
      left,
      top,
      height = 10,
      width = 10,
      depth = 10,
      color = "#e09647",
    } = params;
    params.width = params.width || 5;
    params.align = params.align || "center";
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

export default HorzontalBar;
