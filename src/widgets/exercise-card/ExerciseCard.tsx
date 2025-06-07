import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { DeleteExercise } from "../../features/delete-exercise";

import { TExerciseDto } from "../../shared/types";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

import { ExerciseCardTitle } from "./ExerciseCardTitle";
import styles from "./ExerciseCard.module.css";
import { getFormattedTimeDiff } from "../../shared/lib";

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
}) => {
  const navigate = useNavigate();

  const handleClickRedirectBtn = () => {
    navigate(`${ROUTES.EXERCISES}/${id}`);
  };

  // TODO: ui + вынести логику по файликам с обработчиками

  return (
    <div className={classNames(styles.ExerciseCard, className)}>
      <div className={styles.ExerciseCard__header}>
        <ExerciseCardTitle name={name} />
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
              ? getFormattedTimeDiff(started_at)
              : "Время не отмечено"}
          </span>
        </p>
        <DeleteExercise id={id} />
      </div>
    </div>
  );
};
