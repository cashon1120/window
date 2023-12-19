import { Data } from "./types";

const data: Data = {
  topFrame: {
    model: "TopFrame",
    type: "horizontal",
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
    attribute: {
      left: 10,
      top: 10,
      height: 5,
      width: 200,
    },
  },
  rightFrame: {
    model: "RightFrame",
    type: "vertical",
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
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
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
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
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
    attribute: {
      left: 10,
      top: 10,
      height: 100,
      width: 5,
    },
  },
  bar1: {
    model: "LeftFrame",
    type: "vertical",
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
    attribute: {
      left: 50,
      top: 15,
      width: 5,
      height: 90,
    },
  },
  bar2: {
    model: "LeftFrame",
    type: "vertical",
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
    attribute: {
      left: 120,
      top: 15,
      width: 5,
      height: 90,
    },
  },
  bar3: {
    model: "BottomFrame",
    type: "horizontal",
    tempAttribute: { left: 0, top: 0, height: 0, width: 0 },
    link: {},
    attribute: {
      left: 15,
      top: 50,
      width: 35,
      height: 5,
    },
  },
};

export default data;
