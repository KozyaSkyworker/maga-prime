import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { TExercise } from "../../shared/types";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

import styles from "./ExerciseCard.module.css";

interface Props extends TExercise {
  className?: string;
}

const STRING_DIVIDER = " / ";

export const ExerciseCard: FC<Props> = ({
  className = "",
  id,
  name,
  started_at,
  time_spent,
}) => {
  const navigate = useNavigate();

  const handleClickRedirectBtn = (id: number) => {
    navigate(`${ROUTES.EXERCISES}/${id}`);
  };

  return (
    <div className={classNames(styles.ExerciseCard, className)}>
      <div className={styles.ExerciseCard__header}>
        <h2 className={styles.ExerciseCard__title}>{name}</h2>
        <div>
          <Button text="Перейти" onClick={() => handleClickRedirectBtn(id)} />
        </div>
      </div>
      <div className={styles.ExerciseCard__content}>
        <span className={styles.ExerciseCard__items}>
          {new Date(started_at).toLocaleDateString()}
        </span>
        {STRING_DIVIDER}
        <span className={styles.ExerciseCard__items}>
          {time_spent || "Не начато"}
        </span>
      </div>
    </div>
  );
};
