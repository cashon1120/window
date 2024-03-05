import * as THREE from "three";
import { Handle, HanleProps } from "@/threeD/basicModel";
import { createRoundedRect } from "../../utils/roundedRect";



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

class Handle115 extends Handle {
  constructor(pramas: HanleProps) {
    super(pramas)
    let shape = createRoundedRect(0, 0, 10, 140, 8);
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
    const radius = 2;
    shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 150 - radius);
    shape.quadraticCurveTo(0, 170, radius, 170);
    shape.lineTo(60, 170);
    shape.lineTo(60, 160);
    shape.lineTo(10, 160);
    shape.lineTo(10, 0);
    shape.lineTo(0, 0);
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings2);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.disableUpdate = true;
    mesh.name = "handle";
    mesh.translateY(_offset - 110);
    mesh.translateX(7);
    mesh.translateZ(70);
    mesh.rotateY(Math.PI / 2);
    this.group.add(mesh);

    this.init({...pramas})
  }
}

export default Handle115;
