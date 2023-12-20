import { PropsWithChildren, FC } from "react";

interface Props {
  left: number;
  top: number;
  width?: number;
  height?: number;
  type: "vertical" | "horizontal";
}

const Size: FC<PropsWithChildren<Props>> = (props) => {
  const { left, top, width, height, type } = props;
  const leftOffset = type === "horizontal" ? 0 : 15;
  const topOffset = type === "vertical" ? 0 : 15;
  return (
    <div
      className={`box_size ${
        type === "horizontal" ? "horizontal" : "vertical"
      }`}
      style={{
        left: left - leftOffset,
        top: top + topOffset,
        height: type === "vertical" ? height : "auto",
        width: type === "horizontal" ? width : "auto",
      }}
    >
      <span>{type === "horizontal" ? width : height}</span>
      <div className="line" />
    </div>
  );
};

export default Size;
