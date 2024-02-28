import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import Three from "../Three";

// 修改文件后避免再次渲染
let isCreated = false;
const loader = new FontLoader();
const bottom = -1860

const createSize = (threeInstance: Three) => {
  if (isCreated) return;
  loader.load(
    "fonts/optimer_regular.typeface.json",
    // onLoad callback
    function (font) {
      isCreated = true;
      const textAttr = {
        font,
        // 文本大小
        size: 40,
        // 文本厚度
        height: 0.1,
        // 文本曲线上点的数量, 默认12
        curveSegments: 120,
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
      textMesh.position.set(740, bottom - 50, 0);
      threeInstance.mainGroup.add(textMesh);

      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(2300, bottom - 50, 0);
      threeInstance.mainGroup.add(textMesh);

      geometry = new TextGeometry("3200", textAttr);
      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(1540, bottom - 200, 0);
      threeInstance.mainGroup.add(textMesh);

      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.set(3450, -1000, 0);
      threeInstance.mainGroup.add(textMesh);

      threeInstance.render();
    }
  );

  const material = new THREE.LineBasicMaterial({ color: 0x999999 });
  let xPointsArr = [
    new THREE.Vector3(0, bottom, 0),
    new THREE.Vector3(0, bottom - 100, 0),
    new THREE.Vector3(1600, bottom - 100, 0),
    new THREE.Vector3(1600, bottom, 0),
    new THREE.Vector3(1600, bottom - 100, 0),
    new THREE.Vector3(3200, bottom - 100, 0),
    new THREE.Vector3(3200, bottom, 0),
  ];

  let geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(xPointsArr);
  let line = new THREE.Line(geometry, material);
  threeInstance.mainGroup.add(line);

  xPointsArr = [
    new THREE.Vector3(3300, 0, 0),
    new THREE.Vector3(3400, 0, 0),
    new THREE.Vector3(3400, bottom + 60, 0),
    new THREE.Vector3(3300, bottom + 60, 0),
  ];
  geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(xPointsArr);
  line = new THREE.Line(geometry, material);
  threeInstance.mainGroup.add(line);

  threeInstance.render();
};

export default createSize;