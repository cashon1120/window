/* eslint-disable @typescript-eslint/no-explicit-any */
import fixedSpace from "./fixedSpace";
import frame from "./frame";
import fanSpace from "./fanSpace";

const createModelFunctions: any = {
  frame,
  fixedSpace,
  fanSpace,
  // 这玩意貌似跟frame一样
  centerPillar: frame
};

export default createModelFunctions;
