import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";

/**
 * 框架底部，可能会有轨道之类的元素
 */
class BottomFrame extends Bar {
  constructor(params: BarProps) {
    params.height = params.height || 5;
    super(params);
    const { height = 5, width, depth = 11, color = "#4E646E" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.innerGroup.add(mesh);
    
    // 两个轨道，为了两边不重叠，稍微短一点
    const geometry2 = new THREE.CylinderGeometry(0.6, 0.6, width - 0.05);
    const material2 = new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.2,
      metalness: 0,
      envMapIntensity: 1,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.rotateZ(Math.PI / 2);
    mesh2.translateX(1.5);
    mesh2.translateZ(2.5);
    mesh2.castShadow = true
    mesh2.receiveShadow = true
    this.innerGroup.add(mesh2);

    const mesh3 = new THREE.Mesh(geometry2, material2);
    mesh3.rotateZ(Math.PI / 2);
    mesh3.translateX(1.5);
    mesh3.translateZ(-2.5);
    mesh3.castShadow = true
    mesh3.receiveShadow = true
    this.innerGroup.add(mesh3);

    this.init();
  }
}

export default BottomFrame;
