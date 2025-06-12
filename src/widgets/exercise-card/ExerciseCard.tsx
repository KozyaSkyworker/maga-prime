import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { DeleteExercise } from "../../features/delete-exercise";

import { getFormattedTimeDiff } from "../../shared/lib";
import { TExerciseDto } from "../../shared/types";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

import { ExerciseTitle } from "../exercise-title";
import styles from "./ExerciseCard.module.css";

interface Props extends TExerciseDto {
  className?: string;
}

const STRING_DIVIDER = " / ";

export const ExerciseCard: FC<Props> = ({
  className = "",
  id,
  name,
  created_at,
  started_at,
  stopped_at,
}) => {
  const navigate = useNavigate();

  const handleClickRedirectBtn = () => {
    navigate(`${ROUTES.EXERCISES}/${id}`);
  };

  return (
    <div className={classNames(styles.ExerciseCard, className)}>
      <div className={styles.ExerciseCard__header}>
        <ExerciseTitle
          name={name}
          variant="h2"
          className={styles.ExerciseCardTitle__title}
        />
        <div>
          <Button text="Перейти" onClick={handleClickRedirectBtn} />
        </div>
      </div>
      <div className={styles.ExerciseCard__content}>
        <p>
          <span className={styles.ExerciseCard__items}>
            {new Date(created_at).toLocaleDateString()}
          </span>
          {STRING_DIVIDER}
          <span className={styles.ExerciseCard__items}>
            {started_at
              ? getFormattedTimeDiff(started_at, stopped_at)
              : "Время не отмечено"}
          </span>
        </p>
        <DeleteExercise id={id} />
      </div>
    </div>
  );
};
