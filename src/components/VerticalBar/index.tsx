/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import "../style/style.less";

export interface ChangeProps {
  left?: number;
  top?: number;
  height?: number;
  width?: number;
}

interface Props {
  onChange: (key: string, params: ChangeProps) => void;
  threeD: any;
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
  };
}

const HorizontalBar = (props: Props) => {
  const {
    params: { height, top = 0, left = 0, barWidth },
    name,
    threeD,
    onChange,
  } = props;
  const eventAttr = useRef({
    height,
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
    _minTop: 0,
  });

  const threeDInstance = useRef(threeD);
  const onMouseMove = (e: MouseEvent) => {
    const { current } = eventAttr;
    const { mousedown, left, begin } = current;
    if (!mousedown) {
      return;
    }
    const { clientX } = e;
    let offset = 0;
    offset = begin.x - clientX;
    current._tempLeft = left - offset;
    onChange(name, { left: current._tempLeft });
  };

  const onMouseDown = (e: any) => {
    const { current } = eventAttr;
    const { begin } = current;
    current.mousedown = true;
    // 设置鼠标样式， onMouseUp的时候恢复成默认
    document.body.className = "col";
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
    const { mousedown, _tempLeft, _tempTop, _tempHeight } = eventAttr.current;
    eventAttr.current = {
      ...eventAttr.current,
      left: _tempLeft,
      top: _tempTop,
      height: _tempHeight,
      _minTop: 0,
      mousedown: false,
    };
    // 注意这里的引用关系，不要直接取current.xxxx
    onChange(name, {
      height: _tempHeight,
      top: eventAttr.current._tempTop,
      left: eventAttr.current._tempLeft,
    });
    if (mousedown) {
      threeDInstance.current[name].translate({
        type: "left", // 左右移动
        value: _tempLeft,
      });
    }
  };
  useEffect(() => {
    if (!threeD) return;
    threeDInstance.current = threeD;
  }, [threeD]);

  useEffect(() => {
    eventAttr.current = {
      ...eventAttr.current,
      _tempHeight: height,
      _tempLeft: left,
      _tempTop: top,
    };
    if (threeDInstance.current) {
      // console.log(left, top, height)
      // threeDInstance.current[name].translate({
      //   type: "left",
      //   value: left,
      // });
      // console.log(-top)
      // threeDInstance.current[name].translate({
      //   type: "top",
      //   value: -top,
      // });
      // threeDInstance.current[name].transform({
      //   type: "top",
      //   value: height,
      // });
    }
  }, [height, top, left]);

  return (
    <div
      className="vertical_bar"
      style={{ height, left, top, borderWidth: barWidth }}
    >
      <div className="drag" onMouseDown={onMouseDown} data-type="left"></div>
    </div>
  );
};
export default HorizontalBar;
