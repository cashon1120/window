/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data } from "./types";

// 这里拿来初始化的，不然TS要报错，其实不重要，在下面引用的时候要JSON.parse一下，不然attribute的引用问题要出错
const props = {
  tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
  link: {
    left: [],
    top: [],
    right: [],
    bottom: [],
  },
};

/**
 * 测试数据的格式要按 Data 来
*/
const data: Data = {
  topFrame: {
    model: "TopFrame",
    type: "horizontal",
    attribute: {
      left: 10,
      top: 10,
      height: 5,
      width: 200,
    },
    ...JSON.parse(JSON.stringify(props)),
  },
  window: {
    model: "Window",
    type: "rect",
    attribute: {
      left: 15,
      top: 15,
      height: 50,
      width: 100,
    },
    minSize: 15,
    ...JSON.parse(JSON.stringify(props)),
  },
  rightFrame: {
    model: "RightFrame",
    type: "vertical",
    ...JSON.parse(JSON.stringify(props)),
    attribute: {
      left: 205,
      top: 10,
      height: 100,
      width: 5,
    },
  },
  bottomFrame: {
    model: "BottomFrame",
    type: "horizontal",
    ...JSON.parse(JSON.stringify(props)),
    attribute: {
      left: 10,
      top: 105,
      height: 5,
      width: 200,
    },
  },
  leftFrame: {
    model: "LeftFrame",
    type: "vertical",
    ...JSON.parse(JSON.stringify(props)),
    attribute: {
      left: 10,
      top: 10,
      height: 100,
      width: 5,
    },
  },

  bar2: {
    model: "NormalBar",
    type: "vertical",
    ...JSON.parse(JSON.stringify(props)),
    attribute: {
      left: 115,
      top: 15,
      width: 3,
      height: 90,
    },
  },
  bar3: {
    model: "NormalBar",
    type: "horizontal",
    attribute: {
      left: 15,
      top: 65,
      width: 100,
      height: 3,
    },
    ...JSON.parse(JSON.stringify(props)),
  },
};
export default data;
