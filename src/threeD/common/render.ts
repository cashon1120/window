import * as THREE from "three";
import scene from './scene';
import camera from './camera'
import stats from './stats'

const width = window.innerWidth;
const height = window.innerHeight;
const _renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true,
  alpha: true, // true/false 表示是否可以设置背景色透明
  precision: "mediump", // highp/mediump/lowp 表示着色精度选择
  premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
  // preserveDrawingBuffer: false, // true/false 表示是否保存绘图缓冲
  // physicallyCorrectLights: true, // true/false 表示是否开启物理光照
});
_renderer.setPixelRatio(window.devicePixelRatio);
_renderer.setSize(width, height);
// 设置渲染器，允许光源阴影渲染
_renderer.shadowMap.enabled = true;

/**
 * 重新定义render，统一在这里调用渲染，也是为了兼容之前的写法
*/
export const renderer = {
  render: () => {
    stats.update()
    _renderer.render(scene, camera)
  },
  _renderer
}

export default renderer;
