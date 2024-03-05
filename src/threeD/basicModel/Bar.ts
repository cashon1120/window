/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Three from "../Three";

export interface BarProps {
  threeInstance: Three;
}

class Bar {
  group: THREE.Group;
  threeInstance: Three;
  constructor(threeInstance: Three) {
    this.group = new THREE.Group();
    this.threeInstance = threeInstance;
    this.init();
  }
  private init = () => {
    this.threeInstance.mainGroup.add(this.group);
  };
}

export default Bar;
