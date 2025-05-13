import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

import { Button, Divider, Progress } from "../../shared/ui";
import { TExercise } from "../../shared/types";

import styles from "./Exercise.module.css";

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<TExercise>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/exercises/${id}`, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const data: TExercise = await response.json();
      setExercise({ ...data });
    };

    getData();
  }, []);

  const PERCENT = 78;

  const handleClickNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.Exercise}>
      <div>
        <Button text="Назад" onClick={handleClickNavigateBack} />
      </div>
      <h1 className={styles.Exercise__title}>{exercise?.name}</h1>
      <div className={styles.Exercise__content}>
        <p className={styles["Exercise__time-spent"]}>
          {<ClockIcon />} Время в работе:{" "}
          <span className={styles.Exercise__medium}>
            {exercise?.time_spent}
          </span>
        </p>
        <Progress percent={77} />
        <div>
          <p>
            Процент релавнтных сайтов -{" "}
            <span className={styles.Exercise__medium}>{PERCENT}% </span>
          </p>
        </div>
        <Divider />
        <div>
          <h2>Последние сайты:</h2>
          <ul>
            <li className={styles.Exercise__site}>
              <CheckIcon />
              first
            </li>
            <li className={styles.Exercise__site}>
              <CheckIcon />
              second seconds
            </li>
            <li className={styles.Exercise__site}>
              <CheckIcon />
              third third third third third
            </li>
            <li className={styles.Exercise__site}>
              <CheckIcon />
              fourth fourth fourth
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.Exercise__footer}>
        <Button text="Начать/Закончить" />
        <Button text="К полному отчету" />
      </div>
    </div>
  );
};

export default Exercise;
