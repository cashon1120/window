import { camera, controls } from "../common";

import createAmbientLight from "./ambientLight";
import createPointLight from "./pointLight";
import createSpotLight from "./spotLight";
import createDirectionalLight from "./directionalLight";

// 修改文件后避免再次渲染灯光
let isCreated = false;

// 创建一系列的灯光, 每个灯光可传入 showHelper / showGui 来显示辅助线和调相关参数
const createLight = (width: number, height: number, mainGroup: THREE.Group) => {
  if (isCreated) return;
  isCreated = true;
  // 环境光
  createAmbientLight({ indensity: 2 });
  // createDirectionalLight({
  //   x: -width / 2,
  //   y: height,
  //   z: 0,
  //   intensity: 5,
  //   showGui: true,
  //   showHelper: true,
  //   target: {
  //     x: width / 2,
  //     y: -height / 2,
  //     z: 0,
  //   },
  // });

  createDirectionalLight({
    x: width + 100,
    y: height,
    z: 250,
    intensity: 5,
    showGui: true,
    showHelper: true,
    target: {
      x: width / 2,
      y: -height / 2,
      z: 0,
    },
    
  });
  // 这一个灯光跟随摄像机
  // const light = createSpotLight({
  //   x: width / 2,
  //   y: -height / 2,
  //   z: 100,
  //   decay: 1,
  //   name: "前",
  //   intensity: 200,
  //   showHelper: true,
  //   showGui: true,
  //   target: {
  //     x: width / 2,
  //     y: -height / 2,
  //     z: 0,
  //   }
  // });
  // controls.addEventListener("change", () => {
  //   light.position.copy(camera.position);
  // });
};
export default createLight;
