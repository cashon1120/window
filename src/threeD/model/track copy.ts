import * as THREE from "three";
import Bar from "../class/bar";

interface Props {
  group: THREE.Group;
  width: number;
  height: number;
  depth: number;
  x?: number;
  y?: number;
  z?: number;
  leftBar?: Bar;
  topBar?: Bar;
  rightBar?: Bar;
  bottomBar?: Bar;
  color?: string;
}

class Track extends Bar {
  bar: Bar;
  constructor(params: Props) {
    super(params);
    const {
      width,
      height,
      depth = 3,
      color = "#eee",
      x = 0,
      y = 0,
      z = 0,
    } = params;
    this.width = width;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      wireframe: false,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material)

    // const geometry2 = new THREE.BoxGeometry(width - 1, height, depth - 2);
    // const material2 = new THREE.MeshPhysicalMaterial({
    //   color: "#ffe500",
    //   metalness: 0.5,
    //   roughness: 0.5,
    // });
    // const mesh2 = new THREE.Mesh(geometry2, material2);
    // mesh2.position.set(0, 1, 0);
    // this.group.add(mesh2);
    // this.createTrack();
    // this.group.position.set(x, y, z);
    mesh.translateY(10)
    mesh.position.set(100, 100, 100)
    // this.bar = new Bar({
    //   width,
    //   height,
    //   depth,
    //   // meshs: [mesh],
    //   align: "bottom",
    // })
    this.init()
  }


  private createTrack = () => {
    const pointsArr = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(4, 0),
      new THREE.Vector2(4, 4),
      new THREE.Vector2(3, 4),
      new THREE.Vector2(3, 3),
      new THREE.Vector2(1, 3),
      new THREE.Vector2(1, 4),
      new THREE.Vector2(0, 4),
    ];
    const shape = new THREE.Shape(pointsArr);
    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: this.width -2,
    });
    const material = new THREE.MeshPhysicalMaterial({
      color: "#666",
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateY(Math.PI / 2)
    mesh.translateZ(-this.width / 2 + 1)
    mesh.translateX(-2)
    mesh.translateY(-1)
    // const group = new THREE.Group()
    // group.add(mesh)
    // group.rotateY(Math.PI / 2)
    this.group.add(mesh);
  };
}

export default Track;
