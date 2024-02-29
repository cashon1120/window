import * as THREE from "three";
import Three from "../Three";
import { getMousePosition } from "@/utils/index";

type CallbackObject = THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];

/**
 * 射线拾取器
 * @param targe 一般传入一个组对象，注意是一个数组
 * @param threeInstance 3D实例
 * @param callback 鼠标点击时回调函数
 * @param mousemoveCallback 鼠标移动时回调函数
 */
const createRaycaster = (
  target: THREE.Mesh[] | THREE.Group[],
  threeInstance: Three,
  callback: (result: CallbackObject) => void,
  mousemoveCallback?: (result: CallbackObject) => void
) => {
  const raycaster = new THREE.Raycaster();
  const domElement = threeInstance.renderer.domElement

  domElement.addEventListener("mouseup", () => {
    if (threeInstance.controls) {
      // 可能有需求会暂时禁用控制器，这里恢复控制
      threeInstance.controls.enableRotate = true;
    }
  });

  const handleCallBack = (
    event: MouseEvent,
    callback?: (result: CallbackObject) => void
  ) => {
    const position = getMousePosition(event, threeInstance.renderer);
    raycaster.setFromCamera(
      new THREE.Vector2(position.x, position.y),
      threeInstance.camera
    );
    try {
      const intersects = raycaster.intersectObjects(target);
      if (intersects.length > 0) {
        callback && callback(intersects);
      }
    // eslint-disable-next-line no-empty
    } catch (e) {
      // 这里是由于threejs的bug，当相机角度为0时，会导致相机的near和far值为0，导致相机无法渲染（AI回答的，不晓得是不是这个原因。。。）
    }
  };

  domElement.addEventListener(
    "mousedown",
    (event: MouseEvent) => {
      handleCallBack(event, callback);
    }
  );

  domElement.addEventListener(
    "mousemove",
    (event: MouseEvent) => {
      handleCallBack(event, mousemoveCallback);
    }
  );
};

export default createRaycaster;
