import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { scene, camera, renderer } from "../common";

interface Props {
  x: number;
  y: number;
  z?: number;
  group: THREE.Group;
  rotate: number;
}

interface Translate {
  type: "x" | "y" | "z";
  value: number;
}

class Corner {
  mesh: THREE.Mesh;
  group: THREE.Group;
  constructor(params: Props) {
    const { x, y, z = -1, group, rotate } = params;
    const pointsArr = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(8, 0),
      new THREE.Vector2(8, 4),
      new THREE.Vector2(4, 4),
      new THREE.Vector2(4, 8),
      new THREE.Vector2(0, 8),
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
      color: "#f29e4b",
      side: THREE.DoubleSide,
    });
    this.group = new THREE.Group();
    this.mesh = new THREE.Mesh(geometry, material);
    this.group.add(this.mesh);
    this.group.position.set(x, y, z);
    this.group.rotateZ(rotate);
    group.add(this.group);
  }
  translate = (params: Translate) => {
    const { type, value } = params;
    const target = this.group;
    const tween = new TWEEN.Tween(target.position)
      .to({ [type]: value }, 300)
      .start();
    const render = () => {
      tween.update();
      renderer.render();
      if (target.position[type] !== value) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default Corner;
