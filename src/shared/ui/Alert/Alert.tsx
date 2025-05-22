import { useEffect, useRef } from "react";
import classNames from "classnames";

import styles from "./Alert.module.css";

export interface AlertProps {
  text: string;
  variant?: "success" | "error" | "info";
}

export const Alert = ({ text, variant = "success" }: AlertProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let timer = null;

    if (ref.current) {
      timer = setTimeout(() => {
        ref.current!.remove();
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
