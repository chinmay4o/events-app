import React, { KeyboardEventHandler, MouseEventHandler } from "react";

import styles from "./Primarybtn.module.css";

const Primarybtn = (props) => {
  return (
    <div onClick={props.onClick} className={styles.primary_btn}>
      {props.children}
    </div>
  );
};

export default Primarybtn;
