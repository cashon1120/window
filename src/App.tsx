/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { init3D } from "./threeD/index";
import { Rect, ChangeProps, Bar } from "./components";
import { getLink } from "./threeD/utils";
import { AttributeKey } from "./types";
import dataObj from "./data";
import "./index.less";

function App() {
  const [data, setData] = useState<any>({});
  const [threeD, setThreeD] = useState<any>();

  useEffect(() => {
    setData(getLink(dataObj));
    setThreeD(
      init3D({
        width: 200,
        height: 100,
        object: dataObj,
        container: "threeD",
      })
    );
  }, []);

  // 鼠标拖拽回调事件
  const onChange = (modelName: string, params: ChangeProps) => {
    // 拿到当前更新的属性(top / left)和值
    const updateType: AttributeKey = Object.keys(params).map(
      (key) => key
    )[0] as AttributeKey;
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
    setData({ ...dataObj });
  };

  // 拖拽结束回调事件
  const onComplete = (modelName: string, params: ChangeProps) => {
    Object.keys(dataObj).forEach((key) => {
      Object.keys(dataObj[key].tempAttribute).forEach((attKey) => {
        dataObj[key].tempAttribute[attKey as AttributeKey] =
          dataObj[key].attribute[attKey as AttributeKey];
      });
    });
    const updateType = Object.keys(params).map((key) => key)[0] as AttributeKey;
    threeD[modelName].translate({
      type: updateType,
      value: dataObj[modelName].attribute[updateType],
    });
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
        return <Bar name={key} type="vertical" {...props} />;
      case "horizontal":
        return <Bar name={key} type="horizontal" {...props} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="rect_wrapper">
        {Object.keys(data).map((key) => (
          <div key={key}>{render(key, data[key].type)}</div>
        ))}
      </div>
    </>
  );
}

export default App;
