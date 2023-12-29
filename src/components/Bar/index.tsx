/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import getDragRange from "@/utils/getDragRange";
import { ReactBarProps } from "@/types";
import "../style/style.less";

const Bar = (props: ReactBarProps) => {
  const {
    params: { height, top = 0, left = 0, width },
    name,
    onChange,
    onComplete,
    type,
  } = props;
  // 每次拖拽时可移动的区间，通过 getDragableRange去计算
  const moveRange = useRef({
    min: -Infinity,
    max: Infinity,
  });
  const eventAttr = useRef({
    height,
    width,
    left,
    top,
    mousedown: false,
    begin: {
      x: 0,
      y: 0,
    },
    // 拖动过程中缓存一些参数
    _tempTop: top,
    _tempHeight: height,
    _tempLeft: left,
    _tempWidth: width,
  });

  const onMouseMove = (e: MouseEvent) => {
    const { current } = eventAttr;
    const { mousedown, top, left, begin } = current;
    if (!mousedown) {
      return;
    }
    const { clientX, clientY } = e;
    let offset = 0;
    if (type === "vertical") {
      offset = begin.x - clientX;
      current._tempLeft = Math.min(
        Math.max(moveRange.current.min, left - offset),
        moveRange.current.max
      );
      onChange(name, { left: current._tempLeft });
    }
    if (type === "horizontal") {
      offset = begin.y - clientY;
      current._tempTop = Math.min(
        Math.max(moveRange.current.min, top - offset),
        moveRange.current.max
      );
      onChange(name, { top: current._tempTop });
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const { current } = eventAttr;
    const { begin } = current;
    current.mousedown = true;
    // 设置鼠标样式， onMouseUp的时候恢复成默认
    document.body.className = type === "vertical" ? "cursor_col" : "cursor_row";
    const { clientX, clientY } = e;
    begin.x = clientX;
    begin.y = clientY;
    moveRange.current = getDragRange(props);
    // 动态绑定和移除相关事件，以免其它组件触发
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.className = "";
    const { mousedown, _tempLeft, _tempTop, _tempHeight, _tempWidth } =
      eventAttr.current;
    eventAttr.current = {
      ...eventAttr.current,
      left: _tempLeft,
      top: _tempTop,
      height: _tempHeight,
      width: _tempWidth,
      mousedown: false,
    };
    if (mousedown) {
      const {
        current: { _tempLeft, _tempTop },
      } = eventAttr;
      const params =
        type === "vertical" ? { left: _tempLeft } : { top: _tempTop };
      onComplete && onComplete(name, params);
    }
  };

  return (
    <div
      className={type === "vertical" ? "vertical_bar" : "horizontal_bar"}
      style={{ height, left, top, width }}
      onMouseDown={onMouseDown}
    ></div>
  );
};
export default Bar;
