import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as EarthIcon } from "../../assets/icons/earth.svg";

import { DeleteExercise } from "../../features/delete-exercise";
import { StartExercise } from "../../features/start-exercise";
import { StopExercise } from "../../features/stop-exercise";

import { ExerciseTitle } from "../../widgets/exercise-title";

import {
  EXERCISE_STATUS_NAMES,
  TExercise,
  TExerciseStatuses,
} from "../../shared/types";
import {
  BASE_BACK_URL,
  calculatePercent,
  getFormattedTimeDiff,
  useFetchData,
} from "../../shared/lib";
import { Button, Divider, Progress } from "../../shared/ui";
import { ROUTES } from "../../shared/routes";

import { ExerciseURLItem } from "./ExerciseURLItem";
import styles from "./Exercise.module.css";

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        <ExerciseTitle
          name={data.exercise.name}
          className={styles.Exercise__title}
        />
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
            <Progress percent={calculatePercent(data.urls)} />
            <p>
              Процент релавнтных сайтов -
              <span className={styles.Exercise__medium}>
                {` ${calculatePercent(data.urls)}`}%
              </span>
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
                <ExerciseURLItem {...itm} />
              ))}
            </ul>
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
            name={data.exercise.name}
            urls={data.urls}
          />
        )}
        {data.exercise.status === TExerciseStatuses.FINISHED && (
          <Button
            text={"К полному отчету"}
            onClick={handleRedirectToReport}
            variant="info"
          />
        )}
      </div>
    </div>
  );
};

export default Exercise;
