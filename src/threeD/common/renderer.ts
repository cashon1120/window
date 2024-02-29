import * as THREE from "three";

interface RenderProps {
  containerDom: HTMLElement;
}

const createRenderer = (params: RenderProps) => {
  const {containerDom } = params;
  const {offsetWidth, offsetHeight} = containerDom
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 是否抗锯齿
    alpha: true, // 是否可以设置背景色透明
    precision: "mediump", // highp/mediump/lowp 表示着色精度选择
    premultipliedAlpha: true, // 表示是否可以设置像素深度（用来度量图像的分辨率）
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(offsetWidth, offsetHeight);
  // 设置渲染器，允许光源阴影渲染
  renderer.shadowMap.enabled = true;
  containerDom.appendChild(renderer.domElement);
  return renderer;
};

export default createRenderer;
