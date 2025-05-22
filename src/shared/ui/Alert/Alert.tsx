import { useEffect, useRef } from "react";
import classNames from "classnames";

import styles from "./Alert.module.css";

export interface AlertProps {
  text: string;
  variant?: "success" | "error" | "info";
  callbackBeforeRemove?: () => void;
}

export const Alert = ({
  text,
  variant = "success",
  callbackBeforeRemove,
}: AlertProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let timer = null;

    if (ref.current) {
      timer = setTimeout(() => {
        callbackBeforeRemove?.();
      }, 777);
    }

    return () => {
      clearTimeout(timer!);
    };
  }, []);

  return (
    <p
      className={classNames(styles.Alert, styles[`Alert_${variant}`])}
      ref={ref}
    >
      {text}
    </p>
  );
};
