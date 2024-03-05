/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * JSON数据的相关类型
 */

type ShapeType = string;

export interface CenterPillar extends Frame {
  cpType: number;
  offsetLocation: string;
}

export interface GlassFrame {
  id: string;
  type: string;
  length: number;
  location: ILocation;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  pid?: string;
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
  glassFrame: GlassFrame[];
  specificationId: number;
  specificationName: string;
}

export interface Frame {
  id: string;
  type: string;
  length: number;
  location: ILocation;
  linePoint: LinePoint;
  shapePoint: ShapePoint;
  materialObj: MaterialObj;
  relation?: Relation[];
  pid?: string;
}

export interface IHandleData {
  id: string; // 执手id
  pid: string; // 执手的父id
  isActive: boolean; // 是否是主动执手
  handleType: number; // 执手类型 1 平开玻扇 2 平开纱扇 3 推拉玻扇执手 4推拉纱扇执手
  LDHeight: number; // 执手离地高度
  height: number; // 执手高度
  location: number; // 执手位置 1 上 2 下 3左 4右
  offsetDirection: number; // 偏移方向 0 无  1 上 2 下 3左 4右
  offset: number; // 执手偏移
}

export interface SubObject extends Frame {
  relation?: Relation[];
}

export interface FixedSpace extends Frame {
  glass: Glass;
  width: number;
  height: number;
  lineList: LineList[];
  spaceType: ShapeType;
  subObject: SubObject[];
}

export interface Relation {
  id: string;
  type: string;
  location: ILocation;
}

export type ILocation = 'left' | 'top' | 'right' | 'bottom' ;

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
  location: ILocation;
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
  handleInfo: IHandleData;
  centerPillar: any[];
  isDrivingFan: boolean;
}
export interface FanSpace extends Frame {
  fanNum: number;
  fanObject: FanObject[];
  antiTheftFence: boolean;
  screenFanObject: any[];
}

export interface WindowObj {
  id: string;
  type: string;
  frame: Frame[];
  relation: Relation[];
  shapeType: ShapeType;
  styleType: number;
  centerPillar: CenterPillar[];
  fanSpace?: FanSpace[];
  fixedSpace?: FixedSpace[];
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
