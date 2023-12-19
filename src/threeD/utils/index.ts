/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { Data } from "../../types";

/**
 * 指定范围随机数
 */
export const random = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * 屏幕坐标转设备坐标
 */
export const getMousePosition = (
  event: MouseEvent,
  renderer: THREE.Renderer
) => {
  const { clientLeft, clientTop, width, height } = renderer.domElement;
  const px = event.clientX - clientLeft;
  const py = event.clientY - clientTop;
  //屏幕坐标px、py转标准设备坐标x、y
  //width、height表示canvas画布宽高度
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;
  return { x, y };
};

/**
 * 计算两点距离
 */
export const distance = (a: THREE.Vector3, b: THREE.Vector3) => {
  return a.distanceTo(b);
};

/**
 * 绘制一个自定义矩形, 中心坐标在原点
 */
export const drawRect = (width: number, height: number): THREE.Shape => {
  const pointsArr = [
    new THREE.Vector2(-width / 2, -height / 2),
    new THREE.Vector2(width / 2, -height / 2),
    new THREE.Vector2(width / 2, height / 2),
    new THREE.Vector2(-width / 2, height / 2),
  ];
  const shape = new THREE.Shape(pointsArr);
  return shape;
};

/**
 * 获取传入模型的大小
 */
export const getSize = (mesh: THREE.Mesh) => {
  const box = new THREE.Box3();
  box.expandByObject(mesh);
  return box.getSize(new THREE.Vector3());
};

/**
 * 输入指定角度，返回对应的PI值
 */
export const angleToPI = (angle: number) => {
  return (Math.PI * 2 * angle) / 360;
};

interface TransformPositionParams {
  left: number;
  top: number;
  width: number;
  height: number;
}
/**
 * 根据指定的坐标和宽高，转换为以左上角也0，0的坐标
 */
export const transformPosition = (params: TransformPositionParams) => {
  return {
    x: params.left,
    y: -params.top - params.height / 2,
  };
};

/**
 * 根据初始数据计算各模型之间的关系
 */
export const getLink = (data: Data): Data => {
  // const main = data['main'];
  Object.keys(data).forEach((key) => {
    data[key].link = {
      left: [],
      right: [],
      top: [],
      bottom: [],
    };
    const { attribute, tempAttribute } = data[key];
    const { left, top, width, height } = attribute;
    tempAttribute.top = top;
    tempAttribute.left = left;
    tempAttribute.width = width;
    tempAttribute.height = height;

    switch (data[key].type) {
      // 找到顶部或者底部和当前模型重合或者相连接的 VerticalBar 或者 Rect 模型
      case "horizontal":
        Object.keys(data).forEach((subkey) => {
          if (subkey !== key) {
            const subAttr = data[subkey].attribute;
            // 下方相交或相连
            if (
              subAttr.top >= attribute.top &&
              subAttr.top <= attribute.top + attribute.height
            ) {
              if (data[key].link) {
                (data[key].link as any).bottom.push(subkey);
              }
            }
            // 上方相交或相连
            if (
              subAttr.top + subAttr.height >= attribute.top &&
              subAttr.top + subAttr.height <= attribute.top + attribute.height
            ) {
              if (data[key].link) {
                (data[key].link as any).top.push(subkey);
              }
            }
          }
        });
        break;

      // 找到左侧或者右侧和当前模型重合或者相连接的 HorizontalBar 或者 Rect 模型
      case "vertical":
        Object.keys(data).forEach((subkey) => {
          if (subkey !== key) {
            const subAttr = data[subkey].attribute;
            // 左侧相交或相连
            if (
              subAttr.left >= attribute.left &&
              subAttr.left <= attribute.left + attribute.width
            ) {
              if (data[key].link) {
                (data[key].link as any).right.push(subkey);
              }
            }
            // 右侧相交或相连
            if (
              subAttr.left + subAttr.width >= attribute.left &&
              subAttr.left + subAttr.width <= attribute.left + attribute.width
            ) {
              if (data[key].link) {
                (data[key].link as any).left.push(subkey);
              }
            }
          }
        });
        break;
    }
  });
  return data;
};


