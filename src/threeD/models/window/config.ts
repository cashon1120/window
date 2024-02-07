const extrudeSettings = {
  depth: 4,
  // 对挤出的形状应用是否斜角
  // bevelEnabled: true,
  //斜角的分段层数
  bevelSegments: 10,
  // 用于沿着挤出样条的深度细分的点的数量
  steps: 2,
  // 斜角与原始形状轮廓之间的延伸距离
  bevelSize: 0.8,
  // 设置原始形状上斜角的厚度
  bevelThickness: 0.6,
};

export { extrudeSettings };
