import * as THREE from "three";
import {ExtudeGeometryProps} from '../../types'

const material = new THREE.MeshPhongMaterial({
  color: "#adadab",
  shininess: 100,
});

const extrudeConfig: ExtudeGeometryProps = {
  depth: 80,
  bevelEnabled: false,
  bevelThickness: 15, //倒角尺寸:拉伸方向
  bevelSize: 15, //倒角尺寸:垂直拉伸方向
  bevelSegments: 3, //倒圆角：倒角细分精度，默认3
};

export { material, extrudeConfig };
