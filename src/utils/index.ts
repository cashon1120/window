import * as THREE from "three";
import { Data, BoxProps } from "@/types";

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

/**
 * 根据指定的坐标和宽高，转换为以左上角也0，0的坐标
 */
export const transformPosition = (params: BoxProps) => {
  return {
    x: params.left,
    y: -params.top - params.height / 2,
  };
};


/**
 * 计算所有模型组合后的最大尺寸和左上角位置
 */
export const getComposeSize = (
  data: Data
): {
  left: number;
  top: number;
  width: number;
  height: number;
} => {
  let minLeft = Infinity;
  let maxLeft = -Infinity;
  let minTop = Infinity;
  let maxTop = -Infinity;
  Object.keys(data).forEach((key) => {
    const {
      attribute: { left, top, width, height },
    } = data[key];
    if (left < minLeft) {
      minLeft = left;
    }
    if (left + width > maxLeft) {
      maxLeft = left + width;
    }
    if (top < minTop) {
      minTop = top;
    }
    if (top + height > maxTop) {
      maxTop = top + height;
    }
  });
  const size = {
    left: minLeft,
    top: minTop,
    width: maxLeft - minLeft,
    height: maxTop - minTop,
  };
  return size;
};
