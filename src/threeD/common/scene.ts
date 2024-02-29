import * as THREE from "three";

interface SceneProps {
  background?: THREE.Color | THREE.Texture | THREE.CubeTexture;
  fog?: {
    color: string | number;
    near: number;
    far: number;
  };
}

const createScene = (params?: SceneProps) => {
  const background = params?.background;
  const fog = params?.fog;
  const scene = new THREE.Scene();

  // 设置背景
  if (background) {
    scene.background = background;
  }

  // 添加雾
  if (fog) {
    scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
  }

  return scene;
};

export default createScene;
