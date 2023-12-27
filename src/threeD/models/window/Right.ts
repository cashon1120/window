import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import Bar, { BarAnimationParams, BarProps } from "@/threeD/basicModel/Bar";
import { scene, camera, renderer } from "@/threeD/common";
import Handle from "./Handle";

/**
 * 框架右侧,这里加了一个把手
 */
class RightFrame extends Bar {
  _tempHeight: number;
  handle: Handle
  constructor(params: BarProps) {
    params.width = params.width || 5;
    super(params);
    const { height, width = 5, depth = 10, color = "#eee" } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      //渲染为线条
      // wireframe: true,
      metalness: 0.5,
      roughness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.innerGroup.add(mesh);
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
      renderer.render(scene, camera);
      if (!isEnd) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default RightFrame;
