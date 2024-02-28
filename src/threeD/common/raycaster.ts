import * as THREE from "three";
import Three from '../Three'
import { getMousePosition } from "@/utils/index";

const createRaycaster = (target: THREE.Mesh[] | THREE.Group[], 
  threeInstance: Three,
    callback: (result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) => void, 
    mousemoveCallback?: (result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) => void, ) => {
      threeInstance.renderer.domElement.addEventListener("mouseup", () => {
        threeInstance.controls.enableRotate = true;
  });
  const raycaster = new THREE.Raycaster();
  threeInstance.renderer.domElement.addEventListener("mousedown", (event: MouseEvent) => {
    const position = getMousePosition(event, threeInstance.renderer);
    raycaster.setFromCamera(new THREE.Vector2(position.x, position.y), threeInstance.camera);
    const intersects = raycaster.intersectObjects(target);
    if (intersects.length > 0) {
      callback(intersects)
    }
  });
  threeInstance.renderer.domElement.addEventListener("mousemove", (event: MouseEvent) => {
    const position = getMousePosition(event, threeInstance.renderer);
    raycaster.setFromCamera(new THREE.Vector2(position.x, position.y), threeInstance.camera);
    const intersects = raycaster.intersectObjects(target);
    mousemoveCallback && mousemoveCallback(intersects)
  });
};

export default createRaycaster;
