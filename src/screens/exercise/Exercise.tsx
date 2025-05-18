import { useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

import { BASE_BACK_URL, useFetchData } from "../../shared/lib";
import { Button, Divider, Progress } from "../../shared/ui";
import { TExercise } from "../../shared/types";

import styles from "./Exercise.module.css";

const Exercise = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchData<TExercise>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
  });

  const handleStartListening = () => {
    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage({ action: "startListening" }, (response) => {
      console.log("Ответ от background:", response);
    });
  };

  const PERCENT = 78;

  if (isLoading) {
    return "Загрузка...";
  }

  return (
    <div className={styles.Exercise}>
      <h1 className={styles.Exercise__title}>{data?.name}</h1>
      <div className={styles.Exercise__content}>
        <p className={styles["Exercise__time-spent"]}>
          {<ClockIcon />} Время в работе:{" "}
          <span className={styles.Exercise__medium}>{data?.time_spent}</span>
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
        <Button text="Начать" onClick={handleStartListening} />
        <Button text="К полному отчету" />
      </div>
    </div>
  );
};

export default Exercise;
