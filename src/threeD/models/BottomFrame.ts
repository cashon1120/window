import * as THREE from "three";
import Bar, { AlignType } from "../basicModel/Bar";

interface Props {
  width: number; // 模型的宽度
  height?: number; // 模型的高度
  color?: string;
  group?: THREE.Group;
  depth?: number; // 模型的厚度
  x?: number;
  y?: number;
  z?: number;
  align?: AlignType;
}
/**
 * 框架底部，可能会有轨道之类的元素
*/
class BottomFrame extends Bar {
  constructor(params: Props) {
    params.height = params.height || 5
    params.align = params.align || 'bottom'
    super(params);
    const { height = 5, width, depth = 10, color = "#eee" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      wireframe: false,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const geometry2 = new THREE.BoxGeometry(width - 10, 1, 5);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: '#000',
      wireframe: false,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2); 
    mesh2.translateY(3)
    this.innerGroup.add(mesh);
    this.innerGroup.add(mesh2);
    this.init()
  }
}

export default BottomFrame;
