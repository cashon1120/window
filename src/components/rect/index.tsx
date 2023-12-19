/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import "../style/style.less";

import { ChangeProps } from "../types";

interface Props {
  onChange: (key: string, params: ChangeProps) => void;
  onComplete: (key: string, params: ChangeProps) => void;
  name: string;
  params: {
    width: number;
    height: number;
    top?: number;
    left?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    barWidth?: number;
    topBar?: {
      height: 5,
    };
    rightBar?: {
      width: 5,
    }
    bottomBar?: {
      height: 5,
    }
    leftBar?: {
      width: 5,
    }
  };
}

const Rect = (props: Props) => {
  const {
    params: {
      width,
      height,
      top = 0,
      left = 0,
      barWidth,
      maxWidth = 1000,
      maxHeight = 1000,
      minWidth = 50,
      minHeight = 50,
      topBar = { height: 5 },
      leftBar = { width: 5 },
      rightBar = { width: 5 },
      bottomBar = { height: 5 },
    },
    name,
    onChange,
    // onComplete
  } = props;
  const eventAttr = useRef({
    width,
    height,
    left,
    top,
    type: "top",
    mousedown: false,
    begin: {
      x: 0,
      y: 0,
    },
    // 拖动过程中缓存一些参数
    _tempTop: top,
    _tempWidth: width,
    _tempHeight: height,
    _tempLeft: left,
    _maxTop: 0,
    _maxLeft: 0,
    _minLeft: 0,
    _minTop: 0,
  });
  const [widthValue, setWidthValue] = useState(width);
  const [heightValue, setHeightValue] = useState(height);
  const onMouseMove = (e: MouseEvent) => {
    const { current } = eventAttr;
    const { mousedown, type, top, left, height, width, begin } = current;
    if (!mousedown) {
      return;
    }
    const { clientX, clientY } = e;
    let offset = 0;
    switch (type) {
      case "top":
        offset = begin.y - clientY;
        current._tempTop = top - offset;
        current._tempHeight = height + offset;
        current._minTop = 0;
        current._maxTop = 0;
        if (current._tempHeight < minHeight) {
          current._tempHeight = minHeight;
          current._minTop = height - minHeight + top;
          setHeightValue(minHeight);
          return;
        }
        if (current._tempHeight > maxHeight) {
          current._tempHeight = maxHeight;
          current._maxTop = height - maxHeight + top;
          setHeightValue(maxHeight);
          return;
        }
        setHeightValue(current._tempHeight);
        onChange(name, { top: current._tempTop, height: current._tempHeight });
        break;

      case "bottom":
        offset = clientY - begin.y;
        current._tempHeight = height + offset;
        current._tempHeight = Math.min(
          Math.max(current._tempHeight, minHeight),
          maxHeight
        );
        setHeightValue(current._tempHeight);
        onChange(name, { height: current._tempHeight });
        break;

      case "left":
        offset = begin.x - clientX;
        current._tempLeft = left - offset;
        current._tempWidth = width + offset;
        current._minLeft = 0;
        current._maxLeft = 0;
        if (current._tempWidth < minWidth) {
          current._tempWidth = minWidth;
          current._minLeft = width - minWidth + left;
          setWidthValue(minWidth);
          return;
        }
        if (current._tempWidth > maxWidth) {
          current._tempWidth = maxWidth;
          current._maxLeft = width - maxWidth + left;
          setWidthValue(maxWidth);
          return;
        }
        setWidthValue(current._tempWidth);
        onChange(name, { left: current._tempLeft, width: current._tempWidth });
        break;

      case "right":
        offset = clientX - begin.x;
        current._tempWidth = width + offset;
        current._tempWidth = Math.min(
          Math.max(current._tempWidth, minWidth),
          maxWidth
        );
        setWidthValue(current._tempWidth);
        onChange(name, { width: current._tempWidth });

        break;
    }
    
  };

  const onMouseDown = (e: any) => {
    const { current } = eventAttr;
    const { type, begin } = current;
    current.mousedown = true;
    current.type = e.target.dataset.type;
    // 设置鼠标样式， onMouseUp的时候恢复成默认
    if (type === "left" || type == "right") {
      document.body.className = "col";
    } else {
      document.body.className = "row";
    }
    const { clientX, clientY } = e;
    begin.x = clientX;
    begin.y = clientY;
    // 动态绑定和移除相关事件，以免其它组件触发
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.className = "";
    const {
      mousedown,
      _tempLeft,
      _tempTop,
      _tempWidth,
      _tempHeight,
      _maxTop,
      _maxLeft,
      _minLeft,
      _minTop,
    } = eventAttr.current;
    eventAttr.current = {
      ...eventAttr.current,
      left: _maxLeft || _minLeft || _tempLeft,
      top: _maxTop || _minTop || _tempTop,
      _tempTop: _maxTop || _minTop || _tempTop,
      _tempLeft: _maxLeft || _minLeft || _tempLeft,
      width: _tempWidth,
      height: _tempHeight,
      _maxLeft: 0,
      _maxTop: 0,
      _minLeft: 0,
      _minTop: 0,
      mousedown: false,
    };
    // 注意这里的引用关系，不要直接取current.xxxx
    // onChange(name, {
    //   height: _tempHeight,
    //   width: _tempWidth,
    //   top: eventAttr.current._tempTop,
    //   left: eventAttr.current._tempLeft,
    // });

    if (mousedown) {
      // threeDInstance.current[name].transform({
      //   type,
      //   value: type === "bottom" || type === "top" ? _tempHeight : _tempWidth,
      // });
      // onComplete && onComplete();
    }
   
  };

  return (
    <div
      className="rect_box"
      id="box"
      style={{ width, height, left, top, borderTopWidth: topBar?.height, borderLeftWidth: leftBar?.width, borderRightWidth: rightBar?.width, borderBottomWidth: bottomBar?.height }}
    >
      <div className="size left">
        <span>{heightValue}</span>
        <div className="line"></div>
      </div>
      <div className="size bottom">
        <span id="width_value">{widthValue}</span>
        <div className="line"></div>
      </div>
      <div
        className="drag top"
        style={{ height: barWidth, top: (topBar?.height || 2) * -1 }}
        id="top"
        onMouseDown={onMouseDown}
        data-type="top"
      ></div>
      <div
        className="drag right"
        style={{ width: barWidth, right: (rightBar?.width || 2) * -1 }}
        id="right"
        onMouseDown={onMouseDown}
        data-type="right"
      ></div>
      <div
        className="drag bottom"
        style={{ height: barWidth, bottom: (bottomBar?.height || 2) * -1 }}
        id="bottom"
        onMouseDown={onMouseDown}
        data-type="bottom"
      ></div>
      <div
        className="drag left"
        style={{ width: barWidth, left: (leftBar?.width || 2) * -1 }}
        id="left"
        onMouseDown={onMouseDown}
        data-type="left"
      ></div>
    </div>
  );
};
export default Rect;
