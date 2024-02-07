/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";

// 创建圆角平面
const createRoundedRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const ctx = new THREE.Shape();
  ctx.moveTo( x, y + radius );
  ctx.lineTo( x, y + height - radius );
  ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
  ctx.lineTo( x + width - radius, y + height );
  ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  ctx.lineTo( x + width, y + radius );
  ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
  ctx.lineTo( x + radius, y );
  ctx.quadraticCurveTo( x, y, x, y + radius );
  return ctx;
};

// 创建圆角几何体
const createRoundedGeometry = (shape: THREE.Shape, extrudeSettings: any) => {
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  return geometry;
};

export { createRoundedRect, createRoundedGeometry };
