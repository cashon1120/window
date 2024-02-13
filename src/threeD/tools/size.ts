import * as THREE from "three";
import { scene, renderer } from "../common";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// 修改文件后避免再次渲染
let isCreated = false;
const loader = new FontLoader();
const createSize = () => {
  if (isCreated) return;
  loader.load(
    "fonts/optimer_regular.typeface.json",
    // onLoad callback
    function (font) {
      isCreated = true;
      const textAttr = {
        font,
        // 文本大小
        size: 4,
        // 文本厚度
        height: 0.1,
        // 文本曲线上点的数量, 默认12
        curveSegments: 12,
        // 是否开启斜角
        bevelEnabled: false,
        // 斜角的深度
        bevelThickness: 0,
        // 表示斜角与原始文本轮廓之间的延伸距离
        bevelSize: 0,
        bevelOffset: 0,
        // 斜角的分段数，默认值3
        bevelSegments: 0,
      };
      const materials = [
        new THREE.MeshBasicMaterial({
          color: 0x666666,
        }),
      ];
      let geometry = new TextGeometry("1600", textAttr);
      let textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(75, -215, 0);
      scene.add(textMesh);

      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(235, -215, 0);
      scene.add(textMesh);

      geometry = new TextGeometry("3200", textAttr);
      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(154, -228, 0);
      scene.add(textMesh);

      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(345, -100, 0);
      scene.add(textMesh);

      renderer.render();
    }
  );

  const material = new THREE.LineBasicMaterial({ color: 0x999999 });
  let xPointsArr = [
    new THREE.Vector3(0, -210, 0),
    new THREE.Vector3(0, -220, 0),
    new THREE.Vector3(160, -220, 0),
    new THREE.Vector3(160, -210, 0),
    new THREE.Vector3(160, -220, 0),
    new THREE.Vector3(320, -220, 0),
    new THREE.Vector3(320, -210, 0),
  ];

  let geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(xPointsArr);
  let line = new THREE.Line(geometry, material);
  scene.add(line);

  xPointsArr = [
    new THREE.Vector3(330, 0, 0),
    new THREE.Vector3(340, 0, 0),
    new THREE.Vector3(340, -200, 0),
    new THREE.Vector3(330, -200, 0),
  ];
  geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(xPointsArr);
  line = new THREE.Line(geometry, material);
  scene.add(line);

  renderer.render();
};

export default createSize;
