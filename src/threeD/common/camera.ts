import * as THREE from "three";

interface CameraProps {
  containerDom: HTMLElement; // 摄像机视锥体长宽比
  fov?: number; // 摄像机视锥体垂直视野角度
  near?: number; // 摄像机视锥体近端面
  far?: number; //摄像机视锥体远端面
}

export const createCamera = (params: CameraProps) => {
  const { fov = 45, near = 10, far = 1000, containerDom } = params;
  const { offsetWidth, offsetHeight } = containerDom;
  const camera = new THREE.PerspectiveCamera(
    fov,
    offsetWidth / offsetHeight,
    near,
    far
  );
  return camera;
};

export default createCamera;
