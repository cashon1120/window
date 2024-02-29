import createAmbientLight from "./ambientLight";
import createSpotLight from "./spotLight";
import Three from "../Three";

// 修改文件后避免再次渲染灯光
let isCreated = false;

// 创建一系列的灯光, 每个灯光可传入 showHelper / showGui 来显示辅助线和调相关参数
const createLight = (threeInstance: Three) => {
  const width = 200;
  const height = 300;
  if (isCreated) return;
  isCreated = true;
  // 环境光
  createAmbientLight({ indensity: 1, threeInstance, showGui: true });

  // 上1
  createSpotLight({
    threeInstance,
    x: 0,
    y: height / 2 + 10,
    z: 50,
    name: "上-1",
    intensity: 1200,
    showHelper: true,
    showGui: true,
    castShadow: true,
    penumbra: 0.1,
  });

  // 上2
  // createSpotLight({
  //   threeInstance,
  //   x: 0,
  //   y: height / 2 + 100,
  //   z: -150,
  //   name: "上-2",
  //   intensity: 1200,
  //   showHelper: true,
  //   showGui: true,
  //   castShadow: true,
  //   penumbra: 1,
  // });

  //右阴影
  // createSpotLight({
  //   threeInstance,
  //   x: width / 2 + 200,
  //   y: 0,
  //   z: 100,
  //   decay: 1,
  //   name: "右阴影",
  //   intensity: 1000,
  //   showHelper: true,
  //   showGui: true,
  //   castShadow: true,
  //   angle: 0.8,
  //   penumbra: 1,
  // });

  // 左
  // createSpotLight({
  //   threeInstance,
  //   x: -width / 2 - 200,
  //   y: 0,
  //   z: 100,
  //   decay: 1.2,
  //   name: "左",
  //   intensity: 1300,
  //   // // showHelper: true,
  //   // // showGui: true,
  //   castShadow: true,
  //   angle: 0.8,
  //   penumbra: 1,
  // });

  // 前
  // createSpotLight({
  //   threeInstance,
  //   x: 0,
  //   y: 0,
  //   z: 300,
  //   decay: 1,
  //   name: "前",
  //   intensity: 200,
  //   showHelper: true,
  //   showGui: true,
  //   angle: 0.6,
  //   penumbra: 1,
  // });

  // 后
  // createSpotLight({
  //   threeInstance,
  //   x: 0,
  //   y: 0,
  //   z: -300,
  //   decay: 1,
  //   name: "后",
  //   intensity: 200,
  //   showHelper: true,
  //   showGui: true,
  //   angle: 0.6,
  //   penumbra: 1,
  // });
};

export default createLight;
