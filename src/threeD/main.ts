import * as THREE from "three";
import { scene, controls, camera, renderer } from "./common";
import { createSpotLight, createAmbientLight } from "./lights";
import createCoordinate from "./tools/coordinate";
import initEvent from "./event";
import Rect from "./class/rect";

const WIDTH = 200;
const HEIGHT = 100;

const init = (container: string) => {
  document.getElementById(container)?.appendChild(renderer.domElement);
  const group = new THREE.Group();
  const windowRect = new Rect({
    group,
    width: WIDTH,
    height: HEIGHT,
    barDepth: 8,
    barWidth: 4,
    color: "#f29e4b",
    // bottomBar: new Track({
    //   width: WIDTH,
    //   height: 4,
    //   depth: 6,
    //   group,
    //   x: WIDTH / 2,
    //   color: "#f29e4b",
    // }),
  });
  createAmbientLight();
  createSpotLight({ x: -WIDTH * 2, name: "左" });
  createSpotLight({ x: WIDTH * 2, name: "右" });
  createSpotLight({ y: HEIGHT * 2, name: "上" });
  createSpotLight({ y: -HEIGHT * 2, name: "下" });
  createSpotLight({ z: WIDTH, name: "前" });
  createSpotLight({ z: -WIDTH, name: "后" });

  // 创建辅助坐标尺, 会加载字体文件，会有点卡
  createCoordinate();

  controls.minDistance = 200;
  controls.maxDistance = 300;

  // 灯光跟随摄像机
  controls.addEventListener("change", () => {
    // light.target = group;
    // light.position.copy(camera.position);
  });

  initEvent(windowRect);
  // new Track({
  //   width: WIDTH,
  //   height: 4,
  //   depth: 6,
  //   group,
  //   x: WIDTH / 2,
  //   color: "#f29e4b",
  // }).init()

  // const rect2 =  new Rect({
  //   group,
  //   width: 50,
  //   height: 50,
  //   depth: 4,
  //   barWidth: 4,
  //   y: 46,
  //   x: 10,
  //   color: '#f29e4b'
  // });

  // const leftBar = new Bar({
  //   width: 4,
  //   height: 100,
  //   depth: 6,
  //   group,
  //   color: "#f29e4b",
  //   x: 100,
  //   y: 50,
  // });

  scene.add(group);
  camera.position.set(0, 0, 300);
  controls.update();
};

// 清空画布，暂时没实现
const reset = () => {
  renderer.dispose();
};

export { init, reset };
