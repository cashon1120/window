import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";
import config from "../config";
const { outBarDepth, grooveDepth, grooveSize } = config;

/**
 * 框架底部，可能会有轨道之类的元素
 */
class BottomFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 5;
    super(params);
    const { height, width, color = "#4E646E" } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });

    let geometry = new THREE.BoxGeometry(
      width - grooveSize * 2,
      height- grooveSize,
      outBarDepth
    );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.translateY(grooveSize * 0.5);
    mesh.receiveShadow = true;
    this.innerGroup.add(mesh);

    geometry = new THREE.BoxGeometry(width, height, grooveDepth);
    mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    this.innerGroup.add(mesh);

    this.init();
  }
}

export default BottomFrame;
