import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import camera from './camera'
import stats from "@/threeD/common/stats";
import renderer from './render'

// 相机控件
const initOrbitContros = () => {
    const controls = new OrbitControls(camera, renderer._renderer.domElement);
    // 添加阻尼效果
    // controls.enableDamping = true
    controls.addEventListener("change", () => {
      stats.update();
      renderer.render();
    });
    return controls
}

export default initOrbitContros