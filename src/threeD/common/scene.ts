import * as THREE from "three";
// 创建场景
const scene = new THREE.Scene();

// 添加雾
scene.fog = new THREE.Fog(0x000000, 0.1, 800)

// scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001)


export default scene;