import * as THREE from "three";
import { createRoundedRect, createRoundedGeometry } from "@/utils/roundedRect";
const extrudeSettings = {
  depth: 2,
  // 对挤出的形状应用是否斜角
  bevelEnabled: true,
  //斜角的分段层数
  bevelSegments: 3,
  // 用于沿着挤出样条的深度细分的点的数量
  steps: 1,
  // 斜角与原始形状轮廓之间的延伸距离
  bevelSize: 1,
  // 设置原始形状上斜角的厚度
  bevelThickness: 0.6,
};

class Handle {
  height: number;
  group: THREE.Group;
  constructor() {
    this.height = 10;
    this.group = new THREE.Group();
    let shape = createRoundedRect(0, 0, 1, 22, 0.8);
    let geometry = createRoundedGeometry(shape, extrudeSettings);
    let material = new THREE.MeshPhysicalMaterial({
      color: "#fafafa",
      side: THREE.DoubleSide,
      roughness: 0.2,
      metalness: 0.9,
      envMapIntensity: 1,
      ior: 1.5,
      emissive: "#111111",
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.disableUpdate = true;
    mesh.name = "handle";
    mesh.translateY(-this.height / 2 - 15);
    mesh.translateX(-1);
    mesh.translateZ(2);
    mesh.rotateY(Math.PI / 2);
    this.group.add(mesh);

    shape = createRoundedRect(0, 0, 1, 10, 1);
    geometry = createRoundedGeometry(shape, extrudeSettings);
    material = new THREE.MeshPhysicalMaterial({
      color: "#555555",
      side: THREE.DoubleSide,
      roughness: 1,
      metalness: 1,
      envMapIntensity: 1,
      ior: 1.5,
      emissive: "#222222",
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.disableUpdate = true;
    mesh.translateY(-this.height / 2 - 8.5);
    mesh.scale.set(1, 1, 0.8);
    mesh.translateX(-0.8);
    mesh.translateZ(2.1);
    mesh.rotateY(Math.PI / 2);
    this.group.add(mesh);
  }
}

export default Handle;
