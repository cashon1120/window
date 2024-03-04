/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 原始数据
 */

type ShapeType = string;

interface CenterPillar {
  id: string;
  pid: string;
  type: string;
  cpType: number;
  length: number;
  location: Location;
  relation: Relation[];
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  materialObj: MaterialObj;
  offsetLocation: string;
}

export interface WindowObj {
  id: string;
  type: string;
  frame: Frame[];
  fanSpace: FanSpace[];
  relation: Relation[];
  shapeType: ShapeType;
  styleType: number;
  fixedSpace: FixedSpace[];
  centerPillar: CenterPillar[];
}

export interface Glass {
  id: string;
  pid: string;
  type: number;
  width: number;
  height: number;
  craftList: any[];
  glassCode: string;
  shapeType: ShapeType;
  glassFrame: {
    id: string;
    type: string;
    length: number;
    location: Location;
    linePoint: LinePoint;
    shapePoint: ShapePoint;
    pid?: string;
  }[];
  specificationId: number;
  specificationName: string;
}

export interface SubObject {
  id: string;
  type: string;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  length: number;
  materialObj: MaterialObj;
  location: Location;
  pid?: string;
}
export interface FixedSpace {
  id: string;
  pid: string;
  glass: Glass;
  width: number;
  height: number;
  lineList: LineList[];
  relation: Relation[];
  spaceType: ShapeType;
  subObject: SubObject[];
}

export interface Relation {
  id: string;
  type: string;
  location: string;
}
type Location = string;
export interface MaterialObj {
  id: number;
  code: string;
  name: string;
  type: number;
  position: number;
  lookWidth: number;
  spliceType: number;
  lapRelation: {
    id: number;
    calculatedType: number;
    position: number;
    horizontalNum: number;
    verticalNum: number;
  }[];
  calculatedWidth: number;
}
export interface Frame {
  id: string;
  pid: string;
  type: string;
  length: number;
  location: Location;
  relation: Relation[];
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  materialObj: MaterialObj;
}
export interface LinePoint {
  endX: number;
  endY: number;
  startX: number;
  startY: number;
}
export type ShapePoint = number[];
export interface LineList {
  id: string;
  type: string;
  length: number;
  location: Location;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  pid?: string;
}

export interface FanObject {
  id: string;
  pid: string;
  fanType: number;
  openWay: number;
  fanFrame: Frame[];
  shapeType: string;
  fixedSpace: FixedSpace[];
  handleInfo: {
    id: string;
    pid: string;
    height: number;
    offset: number;
    LDHeight: number;
    isActive: boolean;
    location: number;
    handleType: number;
    offsetDirection: number;
  };
  centerPillar: any[];
  isDrivingFan: boolean;
}
export interface FanSpace {
  id: string;
  pid: string;
  width: number;
  fanNum: number;
  height: number;
  lineList: LineList[];
  relation: Relation[];
  fanObject: FanObject[];
  spaceType: string;
  subObject: SubObject[];
  antiTheftFence: boolean;
  screenFanObject: any[];
}
export interface Data {
  drawData: {
    subFrame: any[];
    windowObj: WindowObj[];
    // windowCase: any[];
    // spliceFrame: any[];
    // bLineOtherData: any;
  };
  offset: {
    x: number;
    y: number;
  };
  scale: {
    x: number;
    y: number;
  };
  // [key: string]: {
  //   // 对应的3D模型， 在src/threeD/models中定义, 每新增一个需要在 src/threeD/models/index 里导出
  //   model: keyof typeof Models;
  //   type: CompentType;
  //   attribute: any;
  //   tempAttribute: TempAttribute;
  //   // 上下左右的连接关系, 在拖动的时候会根据这个关系去更新对应模型的数据， 通过 utils/getModelLinks.ts 计算
  //   link: {
  //     left: string[],
  //     right: string[],
  //     top: string[],
  //     bottom: string[],
  //   };
  //   minSize?: number;
  // };
}

/**
 * 原始数据中模型的相关属性，具体是什么材质的应在model中定义和实现
 */
export interface Attribute extends BoxProps {}
export type AttributeKey = keyof BoxProps;

/**
 * 缓存 Attribute 对应数据，更新的时候拿来计算用, 在 mouseup的时候更新这些数据， 这里直接继承 Attribute
 */
export interface TempAttribute extends Attribute {}

/**
 * 对应React组件的类型， 目前有：横条(horizontal)，竖条(vertical)， 矩形(rect), 每一种类型可能对应多个3D模型
 */
export type CompentType = "horizontal" | "vertical" | "rect";

/**
 * 模型基础属性
 */
export interface BoxProps {
  left: number;
  top: number;
  width: number;
  height: number;
  color?: string;
}

/**
 * React 组件鼠标拖拽回调事件
 */
export interface ChangeProps extends Partial<BoxProps> {}

/**
 * React组件：Bar Props
 */
export interface ReactBarProps {
  data: Data;
  onChange: (key: string, params: ChangeProps) => void;
  onComplete: (key: string, params: ChangeProps) => void;
  name: string;
  type: "vertical" | "horizontal";
  params: BoxProps;
}

/**
 * React组件： Rect Props
 */
export interface ReactRectProps {
  data: Data;
  onChange: (key: string, params: ChangeProps) => void;
  onComplete: (key: string, params: ChangeProps) => void;
  name: string;
  params: {
    width: number;
    height: number;
    top?: number;
    left?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
  };
}

/**
 * 更新材质的数据
 */
export interface ValueObj {
  type: "color" | "map";
  value: {
    color: string;
    map?: any;
    normalmap?: any;
  };
}

/**
 * 拉伸几何体参数
 */
export interface ExtudeGeometryProps {
  depth: number; // 挤出的形状的深度，默认值为1。
  curveSegments?: number; //曲线上点的数量，默认值是12。
  steps?: number; //用于沿着挤出样条的深度细分的点的数量，默认值为1。
  bevelEnabled?: boolean; //对挤出的形状应用是否斜角，默认值为true。
  bevelThickness?: number; //设置原始形状上斜角的厚度。默认值为0.2。
  bevelSize?: number; //斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-0.1。
  bevelOffset?: number; //Distance from the shape outline that the bevel starts. Default is 0.
  bevelSegments?: number; //斜角的分段层数，默认值为3。
}
