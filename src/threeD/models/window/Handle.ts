import * as THREE from "three";

class Handle {
  mesh: THREE.Mesh;
  constructor() {
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
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 2,
      bevelEnabled: false,
      bevelThickness: 15, //倒角尺寸:拉伸方向
      bevelSize: 15, //倒角尺寸:垂直拉伸方向
      bevelSegments: 20, //倒圆角：倒角细分精度，默认3
    });
    const material = new THREE.MeshPhongMaterial({
      color: "#222",
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.translateY(-5);
    this.mesh.translateZ(9);
    this.mesh.rotateY(Math.PI / 2);
  }
}

export default Handle;
