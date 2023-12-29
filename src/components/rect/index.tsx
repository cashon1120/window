/* eslint-disable react-hooks/exhaustive-deps */
import { ReactRectProps } from "@/types";
import {
  LEFT_BAR_SIZE,
  TOP_BAR_SIZE,
  RIGHT_BAR_SIZE,
  BOTTOM_BAR_SIZE,
} from "@/threeD/models/window";
import "../style/style.less";

const Rect = (props: ReactRectProps) => {
  const {
    params: { width, height, top = 0, left = 0 },
  } = props;
  return (
    <div
      className="rect_box"
      id="box"
      style={{
        width,
        height,
        left,
        top,
        borderTopWidth: TOP_BAR_SIZE,
        borderLeftWidth: LEFT_BAR_SIZE,
        borderRightWidth: RIGHT_BAR_SIZE,
        borderBottomWidth: BOTTOM_BAR_SIZE,
      }}
    ></div>
  );
};
export default Rect;
