import * as THREE from "three";
import Bar, { BarProps } from "@/threeD/basicModel/Bar";


/**
 * 框架右侧
 */
class RightFrame extends Bar {
  constructor(params: BarProps) {
    params.width = params.width || 5;
    super(params);
    const { height, width = 5, depth = 10, color = "#eee" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      // wireframe: true,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);

    const pointsArr = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(10, 0),
      new THREE.Vector2(10, 2),
      new THREE.Vector2(2, 2),
      new THREE.Vector2(2, 8),
      new THREE.Vector2(10, 8),
      new THREE.Vector2(10, 10),
      new THREE.Vector2(0, 10),
    ];
    const shape = new THREE.Shape(pointsArr);
    const handleGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: 2,
      bevelEnabled: false,
      bevelThickness: 15, //倒角尺寸:拉伸方向
      bevelSize: 15, //倒角尺寸:垂直拉伸方向
      bevelSegments: 20, //倒圆角：倒角细分精度，默认3
    });
    const handleMaterial = new THREE.MeshPhongMaterial({
      color: "#4f4f4f",
      side: THREE.DoubleSide,
    });
    const group = new THREE.Group()
    const handleMesh = new THREE.Mesh(handleGeometry, handleMaterial)
    group.rotateY(Math.PI / 2)

    handleMesh.translateX(-8)
    handleMesh.translateY(-5)
    group.position.set(this.width / 10, 0, 0)
    group.add(handleMesh)
    this.innerGroup.add(group);
    this.init();
  }
}

export default RightFrame;
