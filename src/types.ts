import * as Models from "./threeD/models";

/**
 * 原始数据
*/
export interface Data {
  [key: string]: {
    // 对应的3D模型
    model: keyof typeof Models;
    type: BarType;
    attribute: Attribute;
    tempAttribute: TempAttribute;
    // 上下左右的连接关系
    link: {
      left: string[],
      right: string[],
      top: string[],
      bottom: string[],
    };
  };
}

/**
 * 原始数据中模型的相关属性，具体是什么材质的应在model中定义和实现
*/
export interface Attribute  extends BoxProps {}
export type AttributeKey = keyof BoxProps;

/**
 * 缓存 Attribute 对应数据，更新的时候拿来计算用, 在 mouseup的时候更新这些数据， 这里直接继承 Attribute
 */
export interface TempAttribute extends Attribute {}

/**
 * 对应HTML的类型, 目前有：横条，竖条， 矩形
*/
export type BarType = "horizontal" | "vertical" | "rect";

/**
 * 模型基础属性
*/
export interface BoxProps {
  left: number;
  top: number;
  width: number;
  height: number;
}


export interface ChangeProps extends Partial<BoxProps> {}

/**
 * Bar Props
*/
export interface BarProps {
  data: Data;
  onChange: (key: string, params: ChangeProps) => void;
  onComplete: (key: string, params: ChangeProps) => void;
  name: string;
  type: "vertical" | "horizontal";
  params: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

