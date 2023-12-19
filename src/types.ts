/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Models from "./threeD/models";

export interface Attribute {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 缓存 Attribute 对应数据，更新的时候拿来计算用, 在 mouseup的时候更新这些数据
 */
export interface TempAttribute extends Attribute {}

/**
 * 对应HTML的类型, 目前有：横条，竖条， 矩形
*/
export type BarType = "horizontal" | "vertical" | "rect";

export type AttributeKey = keyof Attribute;

export interface Data {
  [key: string]: {
    // 对应的3D模型
    model: keyof typeof Models;
    type: BarType;
    attribute: Attribute;
    tempAttribute: TempAttribute;
    // 上下左右的连接关系
    link: {
      [key: string]: any;
    };
  };
}
