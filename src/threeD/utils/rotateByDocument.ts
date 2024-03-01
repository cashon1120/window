import * as THREE from 'three'
interface Props {
    dom: HTMLElement;
    target:THREE.Object3D;
}

const rotateByCustom = (parmas: Props) => {
    const {dom, target} = parmas;
    let isMove = false;
    let mouseX = 0;
    let mouseY = 0;
    const speed = 0.002;
    dom.addEventListener("mousedown", (e) => {
      isMove = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    document.addEventListener("mousemove", (e) => {
      if (isMove) {
        const x = e.pageX;
        const y = e.pageY;
        const _x = x - mouseX;
        const _y = y - mouseY;
        target.rotation.x += _y * speed * Math.PI;
        target.rotation.y += _x * speed * Math.PI;
        mouseX = x;
        mouseY = y;
      }
    });
    document.addEventListener("mouseup", () => {
      isMove = false;
    });
}

export default rotateByCustom;