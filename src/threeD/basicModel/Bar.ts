/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import Three from "../Three";
import { Frame } from "../types";

export interface BarProps {
  data: Frame;
  threeInstance: Three;
  /**
   * 一般情况下会直接渲染到 threeInstance.mainGroup 里，但像窗户等一些本来需要组合成一个整体的就单独传一个 group 来放;
   */
  group?: THREE.Group;
}

class Bar {
  group: THREE.Group;
  threeInstance: Three;
  constructor(threeInstance: Three, group?: THREE.Group) {
    this.group = new THREE.Group();
    this.threeInstance = threeInstance;
    if (group) {
      group.add(this.group);
    } else {
      this.threeInstance.mainGroup.add(this.group);
    }
  }
}

export default Bar;
