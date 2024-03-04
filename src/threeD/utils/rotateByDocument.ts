import * as THREE from "three";
interface Props {
  dom: HTMLElement;
  target: THREE.Object3D;
}

const rotateByCustom = (parmas: Props) => {
  const { dom, target } = parmas;
  let isMove = false;
  let mouseX = 0;
  let mouseY = 0;
  let _x = 0;
  let _y = 0;
  const speed = 0.002;
  let timer: ReturnType<typeof setTimeout>;
  dom.addEventListener("mousedown", (e) => {
    isMove = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  document.addEventListener("mousemove", (e) => {
    clearInterval(timer);
    if (isMove) {
      const x = e.clientX;
      const y = e.clientY;
      _x = x - mouseX;
      _y = y - mouseY;

      target.rotation.x += _y * speed * Math.PI;
      target.rotation.y += _x * speed * Math.PI;
      mouseX = x;
      mouseY = y;
    }
  });
  document.addEventListener("mouseup", () => {
    isMove = false;
    console.log(_x, _y);
    timer = setInterval(() => {
      target.rotation.x += _y * speed * Math.PI;
      // target.rotation.y += _x * speed * Math.PI;
    }, 30);
  });
};

export default rotateByCustom;
