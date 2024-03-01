import { Data } from "@/types";

/**
 * 根据传入的数据计算各模型之间的关系并建立连接
 */
export default  (data: Data): Data => {
    // const main = data['main'];
    Object.keys(data).forEach((key) => {
      data[key].link = {
        left: [],
        right: [],
        top: [],
        bottom: [],
      };
      const {
        attribute,
        attribute: { left, top, width, height },
      } = data[key];
  
      // 传进来的数据是没有 tempAttribute 属性的，这里先把 attribute 的值赋给 tempAttribute
      data[key].tempAttribute = { ...attribute };
  
      switch (data[key].type) {
        // 找到顶部或者底部和当前模型重合或者相连接的 VerticalBar 或者 Rect 模型
        case "horizontal":
          Object.keys(data).forEach((subkey) => {
            if (subkey !== key) {
              const subAttr = data[subkey].attribute;
              // 下方相交或相连
              if (subAttr.top >= top && subAttr.top <= top + height) {
                if (data[key].link) {
                  data[key].link.bottom.push(subkey);
                }
              }
              // 上方相交或相连
              if (
                subAttr.top + subAttr.height >= top &&
                subAttr.top + subAttr.height <= top + height
              ) {
                if (data[key].link) {
                  data[key].link.top.push(subkey);
                }
              }
            }
          });
          break;
  
        // 找到左侧或者右侧和当前模型重合或者相连接的 HorizontalBar 或者 Rect 模型
        case "vertical":
          Object.keys(data).forEach((subkey) => {
            if (subkey !== key) {
              const subAttr = data[subkey].attribute;
              // 左侧相交或相连
              if (subAttr.left >= left && subAttr.left <= left + width) {
                if (data[key].link) {
                  data[key].link.right.push(subkey);
                }
              }
              // 右侧相交或相连
              if (
                subAttr.left + subAttr.width >= left &&
                subAttr.left + subAttr.width <= left + width
              ) {
                if (data[key].link) {
                  data[key].link.left.push(subkey);
                }
              }
            }
          });
          break;
      }
    });
    return data;
  };
  