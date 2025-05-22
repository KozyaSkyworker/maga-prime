import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

import { DeleteExercise } from "../../features/delete-exercise";

import { TExercise, TExerciseStatuses } from "../../shared/types";
import {
  BASE_BACK_URL,
  useFetchData,
  useMutationRequest,
} from "../../shared/lib";
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

  const { mutationRequest } = useMutationRequest<void, TExercise>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "PATCH",
  });

  const handleStartListening = (exerciseId: number) => {
    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "startListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        console.log("Ответ от background:", response);

        if (response.status === "started") {
          mutationRequest().then(() => window.location.reload());
        }
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

    // fetch("http://127.0.0.1:11434/api/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     model: "gemma3:4b",
    //     messages: [
    //       {
    //         role: "user",
    //         content: `Ответь да или нет. Следующий текст "${textContent}" соотносится с тематикой моего задания "${EXERSICE_NAME}"`,
    //       },
    //     ],
    //     stream: false,
    //   }),
    // })
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
        <h1 className={styles.Exercise__title}>{data.name}</h1>
        <DeleteExercise id={data.id} redirectTo={ROUTES.HOME} />
      </div>
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
