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

const extrudeSettings2 = {
  depth: 0.9,
  // 对挤出的形状应用是否斜角
  bevelEnabled: true,
  //斜角的分段层数
  bevelSegments: 5,
  // 用于沿着挤出样条的深度细分的点的数量
  steps: 1,
  // 斜角与原始形状轮廓之间的延伸距离
  bevelSize: 0.6,
  // 设置原始形状上斜角的厚度
  bevelThickness: 0.6,
};

class Handle {
  height: number;
  group: THREE.Group;
  constructor() {
    this.height = 10;
    this.group = new THREE.Group();
    let shape = createRoundedRect(0, 0, 1, 14, 0.8);
    let geometry = createRoundedGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
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
    mesh.userData.disableUpdate = true
    // mesh.receiveShadow = true
    mesh.name = "handle";
    mesh.translateY(-this.height / 2 - 10);
    mesh.translateZ(3);
    mesh.rotateY(Math.PI / 2);

    this.group.add(mesh);

    const radius = 0.2;

    shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 15 - radius);
    shape.quadraticCurveTo(0, 17, radius, 17);
    shape.lineTo(3, 17);
    shape.lineTo(3, 16);
    shape.lineTo(1, 16);
    shape.lineTo(1, 0);
    shape.lineTo(0, 0);
    // shape.quadraticCurveTo(1, 0, 0.5, 1);
    // shape.lineTo(x + width, y + radius);
    // shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    // shape.lineTo(x + radius, y);
    // shape.quadraticCurveTo(x, y, x, y + radius);
    geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings2);

    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.disableUpdate = true
    mesh.name = "handle";
    mesh.translateY(-this.height / 2 - 22);
    mesh.translateX(0.61)
    mesh.translateZ(7);
    mesh.rotateY(Math.PI / 2);
    this.group.add(mesh);
  }
}

export default Handle;
