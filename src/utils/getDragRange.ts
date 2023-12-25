import { BarProps } from "@/types";

/**
 * 拖动前查询能拖动的范围
 */
export default (props: BarProps) => {
  const { name, params, data } = props;
  let currentMin = 0;
  let currentMax = 0;
  const result = {
    min: -Infinity,
    max: Infinity,
  };
  let positionKey: "left" | "top";
  let sizeKey: "width" | "height";
  // 这里type是指当前拖动的模型是垂直还是水平的，垂直的就是控制左右移动，水平的就是控制上下移动
  switch (props.type) {
    case "vertical":
      positionKey = "left";
      sizeKey = "width";
      break;
    case "horizontal":
      positionKey = "top";
      sizeKey = "height";
      break;
  }
  // 拿到当前模型所在的位置
  currentMin = params[positionKey];
  currentMax = params[positionKey] + params[sizeKey];
  Object.keys(data).forEach((key) => {
    const { attribute } = data[key];
    if (key !== name) {
      if (attribute[positionKey] + attribute[sizeKey] < currentMin) {
        result.min = Math.max(
          result.min,
          attribute[positionKey] + attribute[sizeKey]
        );
      }
      if (attribute[positionKey] > currentMax) {
        result.max = Math.min(
          result.max,
          attribute[positionKey] - params[sizeKey]
        );
      }
    }
  });
  return result;
};
