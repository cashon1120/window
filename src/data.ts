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

const color = '#435962'

/**
 * 测试数据的格式要按 Data 来
 */
const data: Data = {
  topFrame: {
    model: "TopFrame",
    type: "horizontal",
    attribute: {
      left: 0,
      top: 0,
      height: 3,
      width: 320,
      color
    },
    ...JSON.parse(JSON.stringify(props)),
  },
  // rightFrame: {
  //   model: "RightFrame",
  //   type: "vertical",
  //   ...JSON.parse(JSON.stringify(props)),
  //   attribute: {
  //     left: 317,
  //     top: 0,
  //     height: 178,
  //     width: 3,
  //     color
  //   },
  // },
  // bottomFrame: {
  //   model: "BottomFrame",
  //   type: "horizontal",
  //   ...JSON.parse(JSON.stringify(props)),
  //   attribute: {
  //     left: 0,
  //     top: 175,
  //     height: 3,
  //     width: 320,
  //     color
  //   },
  // },
  // leftFrame: {
  //   model: "LeftFrame",
  //   type: "vertical",
  //   ...JSON.parse(JSON.stringify(props)),
  //   attribute: {
  //     left: 0,
  //     top: 0,
  //     height: 178,
  //     width: 3,
  //     color
  //   },
  // },
  // window1: {
  //   model: "Window",
  //   type: "rect",
  //   attribute: {
  //     left: 3,
  //     top: 3,
  //     height: 172,
  //     width: 160,
  //     offsetZ: 2.5,
  //     // 暂时用这个来判断把手的样式
  //     type: 'left',
  //     color
  //   },
  //   minSize: 15,
  //   ...JSON.parse(JSON.stringify(props)),
  // },
  // window2: {
  //   model: "Window",
  //   type: "rect",
  //   attribute: {
  //     left: 157,
  //     top: 3,
  //     height: 172,
  //     width: 160,
  //     offsetZ: -2.5,
  //     type: 'right',
  //     color
  //   },
  //   minSize: 15,
  //   ...JSON.parse(JSON.stringify(props)),
  // },
};
export default data;
