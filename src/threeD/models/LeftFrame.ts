import * as THREE from "three";
import Bar, { AlignType } from "../basicModel/Bar";

interface Props {
  height: number; // 模型的高度
  color?: string;
  group?: THREE.Group;
  width?: number; // 模型的宽度
  depth?: number; // 模型的厚度
  x?: number;
  y?: number;
  z?: number;
  align?: AlignType;
}
/**
 * 框架左侧
*/
class LeftFrame extends Bar {
  constructor(params: Props) {
    params.width = params.width || 5
    params.align = params.align || 'left-top'
    super(params);
    const { height, width = 5, depth = 10, color = "#eee" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      wireframe: false,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
    this.init()
  }
}

export default LeftFrame;
