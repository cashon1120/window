import * as THREE from "three";
import {
  BoxProps,
  ShapePoint,
  ExtudeGeometryProps,
  GlassFrame,
} from "../types";

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

export const createGeometryByShapePoint = (
  point: ShapePoint,
  extrudeConfig: ExtudeGeometryProps
) => {
  // 注意和2d坐标系的不同，y轴要取负数
  const shape = new THREE.Shape()
    .moveTo(point[0], -point[1])
    .lineTo(point[2], -point[3])
    .lineTo(point[4], -point[5])
    .lineTo(point[6], -point[7])
    .lineTo(point[0], -point[1]);
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeConfig);
  geometry.translate(0, 0, -extrudeConfig.depth / 2);
  return geometry;
};

export const getModelSize = (obj: THREE.Object3D) => {
  const box = new THREE.Box3();
  return box.expandByObject(obj);
};

export const getPotinFromGlassFrame = (data: GlassFrame[]) => {
  let left = 0, top = 0;
  data.forEach((item: GlassFrame) => {
    if (item.location === "top") {
      left = item.linePoint.startX;
      top = item.linePoint.startY;
    }
  });

  return {
    left,
    top,
  };
};
