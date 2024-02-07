import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import Bar, { BarAnimationParams, BarProps } from "@/threeD/basicModel/Bar";
import {extrudeSettings} from './config'
import { renderer } from "@/threeD/common";
import Handle from "./Handle";
import { createRoundedRect, createRoundedGeometry } from "@/utils/roundedRect";

/**
 * 框架右侧,这里加了一个把手
 */
class RightFrame extends Bar {
  _tempHeight: number;
  handle: Handle;
  constructor(params: BarProps) {
    params.width = params.width || 5;
    super(params);
    const { height, width = 5, color = "#4E646E" } = params;
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 100,
    });
    
    const shape = createRoundedRect(
      0,
      0,
      width - extrudeSettings.bevelSize,
      height - extrudeSettings.bevelThickness * 3,
      0.2
    );
    const geometry = createRoundedGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      -width / 2 + extrudeSettings.bevelSize,
      -height / 2 + extrudeSettings.bevelSize * 2,
      -extrudeSettings.depth / 2
    );
    this.innerGroup.add(mesh);

    // 玻璃的那个胶套, 为了两边不重叠，稍微短一点
    const geometry2 = new THREE.BoxGeometry(2, height - 0.05, 1);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: "#000",
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.translateX(-3);
    this.innerGroup.add(mesh2);

    this.handle = new Handle();
    this.group.add(this.handle.mesh);
    this.innerGroup.position.set(0, 0, 0);
    this._tempHeight = height;
    this.init();
  }
  /**
   * 重写transform方法，父类Bar的transform是变形整个this.group,这里因为加了把手，所以只能变形this.innerGroup，同时把手只改变中心点，不改变高度
   */
  transform = (params: BarAnimationParams) => {
    const { type, value, time = 300 } = params;
    if (!type) {
      throw new Error("请输入变化方向, 如: left | right | top | bottom");
    }
    const target = this.innerGroup;
    let positionTween = new TWEEN.Tween();
    let handleTween = new TWEEN.Tween();
    let _toValue = 0;
    switch (type) {
      case "top":
        this.top = this.bottom - value;
        _toValue = (value - this._tempHeight) / 2 + target.position.y;
        break;

      case "bottom":
        this.bottom = value + this.top;
        _toValue = -(value - this._tempHeight) / 2 + target.position.y;
        break;
    }
    positionTween = new TWEEN.Tween(target.position)
      .to({ y: _toValue }, time)
      .start();

    // 改变把手的中心点位置，注意这里要向下偏移把手高度的一半
    handleTween = new TWEEN.Tween(this.handle.mesh.position)
      .to({ y: _toValue - this.handle.height / 2 }, time)
      .start();

    this._tempHeight = value;

    const scaleValue = value / this.height;
    const tween = new TWEEN.Tween(target.scale)
      .to({ y: scaleValue }, time)
      .start();
    let isEnd = false;
    tween.onComplete(() => {
      isEnd = true;
    });
    const render = () => {
      tween.update();
      positionTween.update();
      handleTween.update();
      renderer.render();
      if (!isEnd) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default RightFrame;
