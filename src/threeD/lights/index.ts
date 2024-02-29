import createAmbientLight from "./ambientLight";
import createSpotLight from "./spotLight";
import Three from "../Three";

// 修改文件后避免再次渲染灯光
let isCreated = false;

/**
 * 创建一系列的灯光
 * @param showHelper 是否显示辅助线
 * @param showGui 是否显示GUI
 * @param x 内容最右侧的位置，也就是x轴的最大值
 * @param y 内容最底部的位置，也就是y轴的最小值，是负数
 */

const createLight = (threeInstance: Three, x: number, y: number) => {
  if (isCreated) return;
  isCreated = true;
  // 定义灯光上下左右大概的位置
  // x, y轴的偏移量, 暂时设为宽高的0.3
  const offsetX = x * 0.2;
  const offsetY = Math.abs(y) * 0.4;
  const left = -x / 2;
  const right = x / 2;
  const top = -y / 2;
  const bottom = y / 2;
  // 环境光
  createAmbientLight({ indensity: 1, threeInstance, showGui: true });
  // 上1
  createSpotLight({
    threeInstance,
    x: left / 2,
    y: top + offsetY,
    z: 40,
    name: "上-1",
    intensity: 10000,
    showHelper: true,
    showGui: true,
    castShadow: true,
    penumbra: 0.1,
    target: {
      x: left / 2,
      y:bottom,
      z: 0,
    }
  });
  // 上2
  createSpotLight({
    threeInstance,
    x: right / 2,
    y: top + offsetY,
    z: 40,
    name: "上-2",
    intensity: 10000,
    showHelper: true,
    showGui: true,
    castShadow: true,
    penumbra: 0.1,
    target: {
      x: right / 2,
      y:bottom,
      z: 0,
    }
  });

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
