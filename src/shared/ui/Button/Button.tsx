import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: FC<Props> = ({ className = "", children, ...props }) => {
  return (
    <button className={classNames(styles.Button, className)} {...props}>
      {children}
    </button>
  );
};
