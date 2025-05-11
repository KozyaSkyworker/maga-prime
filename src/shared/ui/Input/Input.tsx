import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<Props> = ({ className = "", type, ...props }) => {
  return (
    <input
      className={classNames(styles.Input, className)}
      type={type}
      {...props}
    />
  );
};
