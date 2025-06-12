import { useState } from "react";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

import { TUrlDto } from "../../shared/types";

import styles from "./Exercise.module.css";

export const ExerciseURLItem = ({
  id,
  is_relevant,
  description,
  origin,
  title,
}: TUrlDto) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <li key={id} className={styles.Exercise__item}>
      <div className={styles.Exercise__svgWrapper}>
        <CheckIcon
          className={
            styles[
              `Exercise__svgCheck-${is_relevant ? "relevant" : "unrelevant"}`
            ]
          }
        />
      </div>
      <div
        className={styles.Exercise__siteData}
        title="Показать обоснование"
        onClick={() => description && setIsDescriptionVisible((prev) => !prev)}
      >
        <strong>{origin}</strong>
        <p>{title}</p>
        {isDescriptionVisible && (
          <p className={styles.Exercise__siteDescription}>{description}</p>
        )}
      </div>
    </li>
  );
};
