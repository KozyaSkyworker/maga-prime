import classNames from "classnames";

import styles from "./Progress.module.css";

type Percentage = "normal" | "bad" | "good";

export const Progress = ({ percent }: { percent: number }) => {
  let percentage: Percentage = "normal";

  if (percent < 50) {
    percentage = "bad";
  }

  if (percent > 75) {
    percentage = "good";
  }

  return (
    <div className={styles.Progress}>
      <div
        className={classNames(styles.Progress__percent, styles[percentage])}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
