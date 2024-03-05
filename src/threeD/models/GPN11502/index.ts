import * as THREE from "three";
import { Bar, BarProps } from "../../basicModel";
import { createGeometryByShapePoint } from "../../utils/index";
import { ExtudeGeometryProps } from "../../types";

class GPN11502 extends Bar {
  constructor(params: BarProps) {
    super(params.threeInstance, params.group);
    const {
      data: { shapePoint },
    } = params;
    /**
     * 型材配置，后期看是不是需要从数据库获取
     */
    const material = new THREE.MeshPhongMaterial({
      color: "#adadab",
      shininess: 100,
    });

    const extrudeConfig: ExtudeGeometryProps = {
      steps: 2,
      depth: 100,
      bevelEnabled: false,
      bevelThickness: 20, //倒角尺寸:拉伸方向
      bevelSize: 20, //倒角尺寸:垂直拉伸方向
      bevelSegments: 10, //倒圆角：倒角细分精度，默认3
    };
    const geometry = createGeometryByShapePoint(shapePoint, extrudeConfig);
    const mesh = new THREE.Mesh(geometry, material);
    this.group.add(mesh);
  }
}

export default GPN11502;
