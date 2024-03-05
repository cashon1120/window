import * as THREE from "three";
import {
  createRoundedRect,
  createRoundedGeometry,
} from "../../utils/roundedRect";

const extrudeSettings = {
  depth: 20,
  // 对挤出的形状应用是否斜角
  bevelEnabled: true,
  //斜角的分段层数
  bevelSegments: 30,
  // 用于沿着挤出样条的深度细分的点的数量
  steps: 10,
  // 斜角与原始形状轮廓之间的延伸距离
  bevelSize: 10,
  // 设置原始形状上斜角的厚度
  bevelThickness: 6,
};

const extrudeSettings2 = {
  depth: 9,
  // 对挤出的形状应用是否斜角
  bevelEnabled: true,
  //斜角的分段层数
  bevelSegments: 10,
  // 用于沿着挤出样条的深度细分的点的数量
  steps: 10,
  // 斜角与原始形状轮廓之间的延伸距离
  bevelSize: 6,
  // 设置原始形状上斜角的厚度
  bevelThickness: 6,
};

interface Props {
  x: number;
  y: number;
  width: number;
  group: THREE.Group;
  depth: number;
  offset?: number;
}

class LeftHandle {
  height: number;
  group: THREE.Group;
  constructor(parmas: Props) {
    const { x, y, group, width, offset = 0, depth } = parmas;
    this.height = 100;
    this.group = new THREE.Group();
    let shape = createRoundedRect(0, 0, 10, 140, 8);
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

    const _offset = -150;
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.disableUpdate = true;
    // mesh.receiveShadow = true
    mesh.name = "handle";
    mesh.translateY(_offset);
    mesh.translateZ(depth - 50);
    mesh.rotateY(Math.PI / 2);
    this.group.add(mesh);

    const radius = 2;

    shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 150 - radius);
    shape.quadraticCurveTo(0, 170, radius, 170);
    shape.lineTo(30, 170);
    shape.lineTo(30, 160);
    shape.lineTo(10, 160);
    shape.lineTo(10, 0);
    shape.lineTo(0, 0);
    // shape.quadraticCurveTo(1, 0, 0.5, 1);
    // shape.lineTo(x + width, y + radius);
    // shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    // shape.lineTo(x + radius, y);
    // shape.quadraticCurveTo(x, y, x, y + radius);
    geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings2);

    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.disableUpdate = true;
    mesh.name = "handle";
    mesh.translateY(_offset - 110);
    mesh.translateX(7);
    mesh.translateZ(depth - 10);
    mesh.rotateY(Math.PI / 2);
    this.group.add(mesh);
    // 为了让把手在中心位置，需要偏移
    this.group.position.set(
      x + width / 2 - 9 + offset,
      -y + _offset - 110,
      0
    );
    group.add(this.group);
  }
}

export default LeftHandle;
