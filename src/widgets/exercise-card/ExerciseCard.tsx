import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

import { BASE_BACK_URL, useMutationRequest } from "../../shared/lib";
import { TExercise } from "../../shared/types";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

import { ExerciseCardTitle } from "./ExerciseCardTitle";
import styles from "./ExerciseCard.module.css";

interface Props extends TExercise {
  className?: string;
}

const STRING_DIVIDER = " / ";

export const ExerciseCard: FC<Props> = ({
  className = "",
  id,
  name,
  created_at,
  time_spent,
}) => {
  const navigate = useNavigate();

  const { mutationRequest, isMutating } = useMutationRequest<void, string>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "DELETE",
  });

  const handleClickRedirectBtn = () => {
    navigate(`${ROUTES.EXERCISES}/${id}`);
  };

  const handleClickDelete = async () => {
    // TODO: show popup confirm + response обработать
    await mutationRequest();

    window.location.reload();
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
            {time_spent || "Не начато"}
          </span>
        </p>
        <Button
          variant="error"
          onClick={handleClickDelete}
          className={styles.ExerciseCard__delete}
          disabled={isMutating}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};
