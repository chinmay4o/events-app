import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

const PrimaryButton = ({
  btnText,
  onClick,
  ...props
}) => {
  return (
    <button className={styles.primaryButton} onClick={onClick} {...props}>
      {btnText}
    </button>
  );
};

export default PrimaryButton;
