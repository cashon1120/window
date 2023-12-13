import Stats from 'three/addons/libs/stats.module.js';

const stats = new Stats();
//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.dom);

export default stats