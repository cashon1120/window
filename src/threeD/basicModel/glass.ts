import * as THREE from "three";

export interface GlassProps {
  group: THREE.Group;
  width: number;
  height: number;
  depth?: number;
  left?: number;
  top?: number;
  colors?: string[];
    opacity?: number
}

class Glass {
  isOpen: boolean = false;
  rotate: number = 0;
  constructor(params: GlassProps) {
    const { width, height, left = 0, top = 0, depth = 5, group,colors = ["#5584e3", "#3664c1"], opacity = 0.2 } = params;
    // 4个胶条
    // let geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color: "#000",
      metalness: 0.5,
      roughness: 0.5,
    });
    // const mesh = new THREE.Mesh(geometry, material);

    // 这里要注意height要用负数，因为是向下的
    const shape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(width, 0)
      .lineTo(width, -height)
      .lineTo(0, -height)
      .lineTo(0, 0);
    const size = 5;
    const holes = new THREE.Shape()
      .moveTo(size, -size)
      .lineTo(width - size, -size)
      .lineTo(width - size, -height + size)
      .lineTo(size, -height + size)
      .lineTo(size, -size);
    shape.holes.push(holes);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
      bevelThickness: 15, //倒角尺寸:拉伸方向
      bevelSize: 15, //倒角尺寸:垂直拉伸方向
      bevelSegments: 20, //倒圆角：倒角细分精度，默认3
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(left, -top, 0);

    mesh.userData.disableUpdate = true;
    group.add(mesh);

    // 创建玻璃
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    colors.forEach((color: string, index: number) => {
        gradient.addColorStop(index / ((colors.length - 1) || 1), color);
    })
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    const canvasTexture = new THREE.CanvasTexture(canvas);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true, // 透明度设置为 true
      opacity, // 设置透明度
      roughness: 0,
      metalness: 0,
      envMapIntensity: 1,
      // transmission: 0.5, // 折射度，表示光线经过材料时的衰减程度
      clearcoat: 1,
      clearcoatRoughness: 0,
      map: canvasTexture,
    });
    const glassGemotery = new THREE.BoxGeometry(width, height, 0.1);
    const glassMesh = new THREE.Mesh(glassGemotery, glassMaterial);
    glassMesh.castShadow = true;
    glassMesh.name = "glass";
    const glassGroup = new THREE.Group();
    glassGroup.position.set(left, -top, 0);
    glassMesh.position.set(width / 2 + size, -height / 2 - size, 0);
    glassGroup.add(glassMesh);
    glassMesh.userData.disableUpdate = true;
    group.add(glassGroup);
  }
}

export default Glass;
