import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as EarthIcon } from "../../assets/icons/earth.svg";

import { DeleteExercise } from "../../features/delete-exercise";
import { StartExercise } from "../../features/start-exercise";
import { StopExercise } from "../../features/stop-exercise";

import {
  EXERCISE_STATUS_NAMES,
  TExercise,
  TExerciseStatuses,
} from "../../shared/types";
import {
  BASE_BACK_URL,
  getFormattedTimeDiff,
  useFetchData,
} from "../../shared/lib";
import { Button, Divider, Progress } from "../../shared/ui";
import { ROUTES } from "../../shared/routes";

import styles from "./Exercise.module.css";

const PERCENT = 78;

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isClassifacationPending, setIsClassificationPending] = useState(false);

  const { data, isLoading } = useFetchData<TExercise>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
  });

  const handleRedirectToReport = () => {
    navigate(`${ROUTES.REPORTS}/${data?.exercise.id}`);
  };

  if (isLoading) {
    return "Загрузка...";
  }

  if (!data) {
    return "Кажется, такого задания нет или при его получении произошла ошибка";
  }

  return (
    <div className={styles.Exercise}>
      <div className={styles.Exercise__top}>
        <h1 className={styles.Exercise__title}>{data.exercise.name}</h1>
        <DeleteExercise id={data.exercise.id} redirectTo={ROUTES.HOME} />
      </div>
      <div className={styles.Exercise__content}>
        <div className={styles.Exercise__time}>
          <span className={styles.Exercise__status}>
            {EXERCISE_STATUS_NAMES[data.exercise.status - 1]}
          </span>
          {data.exercise.status !== TExerciseStatuses.NOT_STARTED && (
            <p className={styles["Exercise__time-spent"]}>
              {<ClockIcon />} Время в работе:
              <span className={styles.Exercise__medium}>
                {getFormattedTimeDiff(
                  data.exercise.started_at,
                  data.exercise.stopped_at,
                )}
              </span>
            </p>
          )}
        </div>
        {data.exercise.status === TExerciseStatuses.FINISHED && (
          <>
            <Progress percent={77} />
            <p>
              Процент релавнтных сайтов -
              <span className={styles.Exercise__medium}> {PERCENT}% </span>
            </p>
          </>
        )}
        <Divider />
        {data.urls.length > 0 ? (
          <div>
            <div className={styles.Exercise__tracked}>
              <EarthIcon />
              <h2>Посещенные сайты ({data.urls.length}):</h2>
            </div>
            <ul className={styles.Exercise__items}>
              {data.urls.map((itm) => (
                <li key={itm.id} className={styles.Exercise__item}>
                  <div className={styles.Exercise__svgWrapper}>
                    <CheckIcon />
                  </div>
                  <div className={styles.Exercise__siteData}>
                    <strong>{itm.url}</strong>
                    <p>{itm.title}</p>
                  </div>
                </li>
              ))}
            </ul>
            :
          </div>
        ) : (
          <p>Нет посещенных сайтов</p>
        )}
      </div>
      <div className={styles.Exercise__footer}>
        {data.exercise.status === TExerciseStatuses.NOT_STARTED && (
          <StartExercise id={data.exercise.id} />
        )}
        {data.exercise.status === TExerciseStatuses.PROCESS && (
          <StopExercise
            id={data.exercise.id}
            setIsClassificationPending={setIsClassificationPending}
          />
        )}
        {data.exercise.status === TExerciseStatuses.FINISHED && (
          <Button
            text={isClassifacationPending ? "Обработка..." : "К полному отчету"}
            onClick={handleRedirectToReport}
            variant="info"
            disabled={isClassifacationPending}
          />
        )}
      </div>
    </div>
  );
};

export default Exercise;
