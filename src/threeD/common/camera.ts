import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 1000：远裁截面
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 800);


export default camera