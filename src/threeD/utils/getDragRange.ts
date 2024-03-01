import { ReactBarProps } from "@/types";

/**
 * 拖动前查询能拖动的范围
 */
export default (props: ReactBarProps) => {
  const { name, params, data, type } = props;
  let currentMin = 0;
  let currentMax = 0;
  const result = {
    min: -Infinity,
    max: Infinity,
  };
  let positionKey: "left" | "top";
  let sizeKey: "width" | "height";
  // 这里type是指当前拖动的模型是垂直还是水平的，垂直的就是控制左右移动，水平的就是控制上下移动
  switch (type) {
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
  // top / left 的位置
  currentMin = params[positionKey];
  // right / bottom 的位置
  currentMax = params[positionKey] + params[sizeKey];
  Object.keys(data).forEach((key) => {
    const { attribute, minSize = 0 } = data[key];
    if(key === name) return
    // 判断相同 type 的模型，目前只有 Bar 的两种类型(vertical / horizontal)
    if(type === data[key].type){
       // 拖拽目标的左侧或者上面
      if (attribute[positionKey] + attribute[sizeKey] <= currentMin) {
        result.min = Math.max(
          result.min,
          attribute[positionKey] + attribute[sizeKey]
        );
      }
      // 拖拽目标的右侧或者下面
      if (attribute[positionKey] >= currentMax) {
        result.max = Math.min(
          result.max,
          attribute[positionKey] - params[sizeKey]
        );
      }
    }
    // rect 模型的判断
    if(data[key].type === 'rect'){
       // 拖拽目标的左侧或者上面
      if (attribute[positionKey] + minSize <= currentMin) {
        result.min = Math.max(
          result.min,
          attribute[positionKey] + minSize
        );
      }
      // 拖拽目标的右侧或者下面
      if (attribute[positionKey] >= currentMax) {
        result.max = Math.min(
          result.max,
          // 找到目标最右厕所所在的位置
          attribute[positionKey] + attribute[sizeKey] - params[sizeKey] - minSize
        );
      }
    }
   
  });
  console.log(result)
  return result;
};
