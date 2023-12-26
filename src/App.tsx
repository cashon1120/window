/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { init3D, reset3D, ThreeDObject } from "./threeD/index";
import { Rect, Bar, Size, Window } from "./components";
import { getComposeSize } from "./utils";
import getModelLink from "./utils/getModelLink";
import { AttributeKey, Data, ChangeProps } from "./types";
import dataObj from "./data";
import "./index.less";

function App() {
  const [data, setData] = useState<Data>({});
  const [threeD, setThreeD] = useState<ThreeDObject>({});
  // 记录整个所有模型组合后的最大尺寸和左上角位置
  const [boxSize, setBoxSize] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  useEffect(() => {
    setData(getModelLink(dataObj));
    setBoxSize(getComposeSize(dataObj));
    setThreeD(
      init3D({
        width: 200,
        height: 100,
        data: dataObj,
        container: "threeD",
      })
    );
    return reset3D;
  }, []);

  // 鼠标拖拽回调事件，这里只更新 HTML 的样式，3D模型修改在 onComplete 里执行，减少执行3D渲染的次数，提高性能
  const onChange = (modelName: string, params: ChangeProps) => {
    // 拿到当前更新的属性(top / left)和值
    const updateType = Object.keys(params).map((key) => key)[0] as AttributeKey;
    const newValue = params[updateType as keyof ChangeProps] || 0;
    const offset = dataObj[modelName].tempAttribute[updateType] - newValue;
    dataObj[modelName].attribute[updateType] = newValue;
    switch (updateType) {
      // 如果是上下移动，需要更新有上下关系的模型数据: link.top / link.bottom
      case "top":
        // 下方的模型需要修改 height 和  top 值，
        dataObj[modelName].link.bottom.forEach((model: string) => {
          dataObj[model].attribute.top =
            dataObj[model].tempAttribute.top - offset;
          dataObj[model].attribute.height =
            dataObj[model].tempAttribute.height + offset;
        });

        // 上方的模型只需要修改 height
        dataObj[modelName].link.top.forEach((model: string) => {
          dataObj[model].attribute.height =
            dataObj[model].tempAttribute.height - offset;
        });
        break;
      // 如果是左右移动，需要更新有左右关系的模型数据: link.left / link.right
      case "left":
        // 右侧的模型需要修改 left 和  width 值，
        dataObj[modelName].link.right.forEach((model: string) => {
          dataObj[model].attribute.left =
            dataObj[model].tempAttribute.left - offset;
          dataObj[model].attribute.width =
            dataObj[model].tempAttribute.width + offset;
        });
        // 左侧的模型只需要修改 width
        dataObj[modelName].link.left.forEach((model: string) => {
          dataObj[model].attribute.width =
            dataObj[model].tempAttribute.width - offset;
        });
        break;
    }
    const newDataObj = { ...dataObj };
    setBoxSize(getComposeSize(newDataObj));
    setData(newDataObj);
  };

  // 拖拽结束回调事件，执行3D模型的更新
  const onComplete = (modelName: string, params: ChangeProps) => {
    // 更新临时属性(tempAttribute)，临时属性在下一次拖动时会用到，而 attribute 是在拖拽的过程中实时更新的，见 onChange 事件
    Object.keys(dataObj).forEach((key) => {
      Object.keys(dataObj[key].tempAttribute).forEach((attKey) => {
        dataObj[key].tempAttribute[attKey as AttributeKey] =
          dataObj[key].attribute[attKey as AttributeKey];
      });
    });
    const updateType = Object.keys(params).map((key) => key)[0] as AttributeKey;
    // 更新当前拖拽模型的位置
    threeD[modelName].translate({
      type: updateType,
      value: dataObj[modelName].attribute[updateType],
    });
    // updateType 目前只有 left 和 top 两种类型, 就是左右或者上下移动
    switch (updateType) {
      case "top":
        dataObj[modelName].link.bottom.forEach((model: string) => {
          threeD[model].transform({
            type: "top",
            value: dataObj[model].attribute.height,
          });
        });

        dataObj[modelName].link.top.forEach((model: string) => {
          threeD[model].transform({
            type: "bottom",
            value: dataObj[model].attribute.height,
          });
        });
        break;

      case "left":
        dataObj[modelName].link.right.forEach((model: string) => {
          threeD[model].transform({
            type: "left",
            value: dataObj[model].attribute.width,
          });
        });

        dataObj[modelName].link.left.forEach((model: string) => {
          threeD[model].transform({
            type: "right",
            value: dataObj[model].attribute.width,
          });
        });
        break;
    }
  };

  const render = (key: string, type: string) => {
    const props = { params: dataObj[key].attribute, onChange, onComplete };
    switch (type) {
      case "rect":
        return <Rect key={key} name={key} {...props} />;
      case "vertical":
        return <Bar data={data} name={key} type="vertical" {...props} />;
      case "horizontal":
        return <Bar data={data} name={key} type="horizontal" {...props} />;
      case "window":
        return <Window data={data} name={key} {...props} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div
        className="rect_wrapper"
        style={{ width: boxSize.width, height: boxSize.height }}
      >
        {/* 显示尺寸 */}
        <Size
          type="vertical"
          left={boxSize.left}
          top={boxSize.top}
          height={boxSize.height}
        />
        <Size
          type="horizontal"
          left={boxSize.left}
          top={boxSize.height + boxSize.top}
          width={boxSize.width}
        />

        {Object.keys(data).map((key) => (
          <div key={key}>{render(key, data[key].type)}</div>
        ))}
      </div>
    </>
  );
}

export default App;
