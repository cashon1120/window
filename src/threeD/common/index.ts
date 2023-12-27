import scene from "./scene";
import initOrbitContros from "./orbitControls";
import camera from "./camera";
import renderer from "./render";
import { createGui } from "./gui";
import createHelper from "./helper";
import gui, { guiPosition, guiColor, guiBoolean } from "./gui";
import stats from "./stats";

// 创建辅助坐标和平面
// createHelper(scene)

// 创建Gui
createGui(renderer._renderer, scene, camera);

// 窗口大小改变回调, 这里可以加一个节流
window.addEventListener("resize", () => {
  renderer._renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render();
});

renderer.render();
const controls = initOrbitContros();
export {
  scene,
  controls,
  camera,
  renderer,
  createGui,
  createHelper,
  stats,
  gui,
  guiPosition,
  guiColor,
  guiBoolean,
};
