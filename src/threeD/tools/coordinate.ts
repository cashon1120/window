import * as THREE from "three";
import { scene, camera, renderer } from "../common";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// 修改文件后避免再次渲染
let isCreated =false

const MIN_SIZE = -300;
const MAX_SIZE = 300;

const loader = new FontLoader();
const createCoordinate = () => {
  if(isCreated) return
  loader.load(
    "fonts/optimer_regular.typeface.json",
    // onLoad callback
    function (font) {
      isCreated = true
      const textAttr = {
        font,
        // 文本大小
        size: 2.5,
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
          color: 0xffffff,
        }),
      ];
      for (let i = MIN_SIZE; i <= MAX_SIZE; i++) {
        let _value_x = 2;
        let _value_y = -2;
        if (i % 10 === 0) {
          _value_x = 4;
          _value_y = -4;
          if (i !== 0) {
            const geometry1 = new TextGeometry(i.toString(), textAttr);
            const geometry2 = new TextGeometry((-i).toString(), textAttr);
            const textMesh1 = new THREE.Mesh(geometry1, materials);
            textMesh1.position.set(i - 2, 5, 0);
            const textMesh2 = new THREE.Mesh(geometry2, materials);
            textMesh2.position.set(-10, i - 1, 0);
            scene.add(textMesh1);
            scene.add(textMesh2);
          }
        }

        const xPointsArr = [
          new THREE.Vector3(i, 0, 0),
          new THREE.Vector3(i, _value_x, 0),
        ];

        const yPointsArr = [
          new THREE.Vector3(_value_y, i, 0),
          new THREE.Vector3(0, i, 0),
        ];

        const xGeometry = new THREE.BufferGeometry();
        xGeometry.setFromPoints(xPointsArr);
        const xLine = new THREE.Line(xGeometry, material);

        const yGeometry = new THREE.BufferGeometry();
        yGeometry.setFromPoints(yPointsArr);
        const yLine = new THREE.Line(yGeometry, material);

        scene.add(xLine);
        scene.add(yLine);
      }
      renderer.render(scene, camera);
    }

    // onProgress callback
    // function (xhr) {
    //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    // },

    // onError callback
    // function (err) {
    //   console.log("An error happened");
    // }
  );
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const xPointsArr = [
    new THREE.Vector3(MIN_SIZE, 0, 0),
    new THREE.Vector3(MAX_SIZE, 0, 0),
  ];

  const xGeometry = new THREE.BufferGeometry();
  xGeometry.setFromPoints(xPointsArr);
  const xLine = new THREE.Line(xGeometry, material);

  const yPointsArr = [
    new THREE.Vector3(0, MIN_SIZE, 0),
    new THREE.Vector3(0, MAX_SIZE, 0),
  ];
  const yGeometry = new THREE.BufferGeometry();
  yGeometry.setFromPoints(yPointsArr);
  const yLine = new THREE.Line(yGeometry, material);
  scene.add(xLine);
  scene.add(yLine);
};

export default createCoordinate;
