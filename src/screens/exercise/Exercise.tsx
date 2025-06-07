import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as EarthIcon } from "../../assets/icons/earth.svg";

import { DeleteExercise } from "../../features/delete-exercise";

import {
  EXERCISE_STATUS_NAMES,
  TExercise,
  TExerciseStatuses,
  TExerciseUpdateRequest,
} from "../../shared/types";
import {
  BASE_BACK_URL,
  useFetchData,
  useMutationRequest,
} from "../../shared/lib";
import { Button, Divider, Progress } from "../../shared/ui";
import { ROUTES } from "../../shared/routes";

import styles from "./Exercise.module.css";
import { useState } from "react";

const PERCENT = 78;

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isClassifacationPending, setIsClassificationPending] = useState(false);
  const [text] = useState("text");

  const { data, isLoading } = useFetchData<TExercise>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
  });

  const { mutationRequest } = useMutationRequest<
    TExerciseUpdateRequest,
    TExercise
  >({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "PATCH",
  });

  const handleStartListening = (exerciseId: number) => {
    mutationRequest({ status: TExerciseStatuses.PROCESS }).then(() =>
      window.location.reload(),
    );

    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "startListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        if (response.status === "started") {
          mutationRequest({ status: TExerciseStatuses.PROCESS }).then(() =>
            window.location.reload(),
          );
        }
      },
    );

    // TODO: reload для тригера рефетча?
  };

  const handleStopListening = (exerciseId: number) => {
    mutationRequest({ status: TExerciseStatuses.FINISHED }).then(() =>
      window.location.reload(),
    );

    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "stopListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        if (response.status === "stopped") {
          handleStopExerciseAndClassificate();
        }
      },
    );
  };

  async function handleStopExerciseAndClassificate() {
    setIsClassificationPending(true);

    // TODO: hook на fetch
    const [first] = await Promise.allSettled([
      fetch("http://127.0.0.1:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:4b",
          messages: [
            {
              role: "user",
              content: `Ответь в виде массива JSON, где каждый элемент — это ответ "да" или "нет" при сравнении каждой из следующих фраз на соотношение фразы к фразе "Теория вероятности": ${data?.urls.map((itm) => itm.title).join(";")}`,
            },
          ],
          stream: false,
        }),
      }),
      mutationRequest({ status: TExerciseStatuses.FINISHED }),
    ]);

    // @ts-expect-error TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const d = await first.value.json();

    // TODO: hook на fetch
    //  TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await fetch(`${BASE_BACK_URL}/urls/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        // TODO:
        // url: id, итог из пред. запроса ?!??!?!?!?!?
      }),
    });

    setIsClassificationPending(false);
  }

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
                {data.exercise.time_spent}
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
          <Button
            text="Начать"
            onClick={() => handleStartListening(data.exercise.id)}
            variant="new"
          />
        )}
        {data.exercise.status === TExerciseStatuses.PROCESS && (
          <Button
            text="Остановить"
            onClick={() => handleStopListening(data.exercise.id)}
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
        <button
          onClick={handleStopExerciseAndClassificate}
          disabled={isClassifacationPending}
        >
          click {String(isClassifacationPending)}
        </button>
        {text}
      </div>
    </div>
  );
};

export default Exercise;
