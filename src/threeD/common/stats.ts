import Stats from "three/addons/libs/stats.module.js";

const createStats = (container: HTMLElement) => {
  const stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  container.appendChild(stats.dom);
  return stats;
};

export default createStats;
