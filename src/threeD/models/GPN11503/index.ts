import * as THREE from "three";
import { createGeometryByShapePoint } from "../../utils/index";
import Three from "../../Three";
import { Frame, ExtudeGeometryProps } from "../../types";

export interface BarProps {
  data: Frame;
  threeInstance: Three;
}

class GPN11503 {
  constructor(params: BarProps) {
    const {
      data: { shapePoint },
      threeInstance,
    } = params;
    /**
     * 型材配置，后期看是不是需要从数据库获取
     */
    const material = new THREE.MeshPhongMaterial({
      color: "#adadab",
      shininess: 100,
    });

    const extrudeConfig: ExtudeGeometryProps = {
      depth: 80,
      bevelEnabled: false,
      bevelThickness: 15, //倒角尺寸:拉伸方向
      bevelSize: 15, //倒角尺寸:垂直拉伸方向
      bevelSegments: 3, //倒圆角：倒角细分精度，默认3
    };
    const geometry = createGeometryByShapePoint(shapePoint, extrudeConfig);
    const mesh = new THREE.Mesh(geometry, material);
    threeInstance.mainGroup.add(mesh);
  }
}

export default GPN11503;
