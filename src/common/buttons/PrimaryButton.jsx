import { MouseEventHandler } from "react";
import styles from "./Primarybtn.module.css";

const PrimaryButton = ({
  btnText,
  onClick,
  ...props
}) => {
  return (
    <button className={styles.primary_btn} onClick={onClick} {...props}>
      {btnText}
    </button>
  );
};

export default PrimaryButton;
