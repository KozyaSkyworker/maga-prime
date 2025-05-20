import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

import { TExercise, TExerciseStatuses } from "../../shared/types";
import { BASE_BACK_URL, useFetchData } from "../../shared/lib";
import { Button, Divider, Progress } from "../../shared/ui";
import { ROUTES } from "../../shared/routes";

import styles from "./Exercise.module.css";

const PERCENT = 78;

const Exercise = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useFetchData<TExercise>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
  });

  const handleStartListening = (exerciseId: number) => {
    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "startListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        console.log("Ответ от background:", response);
      },
    );
    // TODO: reload для тригера рефетча?
  };

  const handleStopListening = (exerciseId: number) => {
    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "stopListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        console.log("Ответ от background:", response);
      },
    );
    // TODO: reload для тригера рефетча?
  };

  if (isLoading) {
    return "Загрузка...";
  }

  if (!data) {
    return "Кажется, такого задания нет или при его получении произошла ошибка";
  }

  return (
    <div className={styles.Exercise}>
      <h1 className={styles.Exercise__title}>{data.name}</h1>
      <div className={styles.Exercise__content}>
        {data.status !== TExerciseStatuses.NOT_STARTED && (
          <p className={styles["Exercise__time-spent"]}>
            {<ClockIcon />} Время в работе:{" "}
            <span className={styles.Exercise__medium}>{data.time_spent}</span>
          </p>
        )}
        <Progress percent={77} />
        <div>
          <p>
            Процент релавнтных сайтов -{" "}
            <span className={styles.Exercise__medium}>{PERCENT}% </span>
          </p>
        </div>
        <Divider />
        <div>
          <h2>Посещенные сайты:</h2>
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
        {data.status === TExerciseStatuses.NOT_STARTED && (
          <Button
            text="Начать"
            onClick={() => handleStartListening(data.id)}
            variant="new"
          />
        )}
        {data.status === TExerciseStatuses.PROCESS && (
          <Button
            text="Остановить"
            onClick={() => handleStopListening(data.id)}
          />
        )}
        {data.status === TExerciseStatuses.FINISHED && (
          <Button
            text="К полному отчету"
            onClick={() => navigate(`${ROUTES.REPORT}/${data.id}`)}
            variant="info"
          />
        )}
      </div>
    </div>
  );
};

export default Exercise;
