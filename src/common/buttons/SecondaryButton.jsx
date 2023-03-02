import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

const secondaryButton = ({
  btnText,
  onClick,
}) => {
  return (
    <button className={styles.secondaryButton} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default secondaryButton;
