import * as THREE from "three";

interface CameraProps {
  aspect: number; // 摄像机视锥体长宽比
  fov?: number; // 摄像机视锥体垂直视野角度
  near?: number; // 摄像机视锥体近端面
  far?: number; //摄像机视锥体远端面
}

export const createCamera = (params: CameraProps) => {
  const { fov = 45, aspect, near = 10, far = 1000 } = params;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  return camera;
};

export default createCamera;
