import * as THREE from "three";
import { renderer, camera, controls } from "./index";
import { getMousePosition } from "@/utils/index";
const raycaster = new THREE.Raycaster();

const createRaycaster = (houses: THREE.Mesh[] | THREE.Group[], callback: (result: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) => void) => {
  renderer._renderer.domElement.addEventListener("mouseup", () => {
    controls.enableRotate = true;
  });
  renderer._renderer.domElement.addEventListener("mousedown", (event: MouseEvent) => {
    const position = getMousePosition(event, renderer._renderer);
    raycaster.setFromCamera(new THREE.Vector2(position.x, position.y), camera);
    const intersects = raycaster.intersectObjects(houses);
    if (intersects.length > 0) {
      callback(intersects)
    }
  });
};

export default createRaycaster;
