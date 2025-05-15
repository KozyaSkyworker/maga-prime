import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  text?: string;
  className?: string;
  variant?: "primary" | "new" | "info" | "ghost";
}

export const Button: FC<Props> = ({
  className = "",
  text,
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.Button,
        styles[`Button_${variant}`],
        className,
      )}
      {...props}
    >
      {children ?? text}
    </button>
  );
};
