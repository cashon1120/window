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
 * 获取模型的中心位置，返回{x, y, z}
 */
export const getCenter = (object: THREE.Object3D) => {
  const box3 = new THREE.Box3();
  box3.expandByObject(object);
  const center = new THREE.Vector3();
  return box3.getCenter(center);
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
 *根据数据里的 shapePoint 绘制平面几何体
 */
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
  // 默认
  geometry.translate(0, 0, -extrudeConfig.depth / 2);
  return geometry;
};

/**
 * 获取模型的大小和位置
 */
export const getModelSize = (obj: THREE.Object3D) => {
  if (!obj.isObject3D) {
    throw new Error(`传入的对象不是Object3D: ${obj}`);
  }
  // 获取位置信息,里面有{min, max}, 这里暂时只取了左上角的位置(下面返回的x,y)
  const box = new THREE.Box3();
  const box3 = box.expandByObject(obj);
  // 获取大小信息
  box.setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);
  return {
    x: box3.min.x,
    y: box3.max.y,
    width: size.x,
    height: size.y,
    depth: size.z,
  };
};

/**
 * 获取窗体的左上角位置
*/
export const getPotinFromGlassFrame = (data: GlassFrame[]) => {
  let left = 0,
    top = 0;
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
