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

interface WindowObj {
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

interface Glass {
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

interface SubObject {
  id: string;
  type: string;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  length: number;
  materialObj: MaterialObj;
  location: Location;
  pid?: string;
}
interface FixedSpace {
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

interface Relation {
  id: string;
  type: string;
  location: string;
}
type Location = string;
interface MaterialObj {
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
interface Frame {
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
interface LinePoint {
  endX: number;
  endY: number;
  startX: number;
  startY: number;
}
type ShapePoint = number[];
interface LineList {
  id: string;
  type: string;
  length: number;
  location: Location;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  pid?: string;
}

interface FanObject {
  id: string;
  pid: string;
  fanType: number;
  openWay: number;
  fanFrame: Frame[];
  shapeType: string;
  fixedSpace: FixedSpace[];
  handleInfo: {
    id: string;
    pid: string
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
interface FanSpace {
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
export interface Attribute extends BoxProps {
  [key: string]: any;
}
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

export interface ValueObj {
  type: "color" | "map";
  value: {
    color: string;
    map?: any;
    normalmap?: any;
  };
}
