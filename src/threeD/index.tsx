import { useEffect } from "react";
import { init, reset } from "./main";
import styles from "./css/style.module.less";

const ThreeD = () => {
  useEffect(() => {
    init("container_3d");
    return () => {
        reset()
    }
  }, []);
  return <div className={styles.wrapper} id="container_3d" />;
};

export default ThreeD;
