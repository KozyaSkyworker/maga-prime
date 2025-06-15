import { useState } from "react";

import { Button } from "../../shared/ui";
import {
  useMutationRequest,
  BASE_BACK_URL,
  getTitledObjectsArray,
} from "../../shared/lib";
import {
  TExerciseUpdateRequest,
  TExercise,
  TExerciseStatuses,
  TUrlDto,
} from "../../shared/types";

export const StopExercise = ({
  id,
  name,
  urls,
}: {
  id: number;
  name: string;
  urls: TUrlDto[];
}) => {
  const [isClassifacationPending, setIsClassificationPending] = useState(false);

  const { mutationRequest } = useMutationRequest<
    TExerciseUpdateRequest,
    TExercise
  >({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "PATCH",
  });

  const handleStopListening = (exerciseId: number) => {
    // mutationRequest({ status: TExerciseStatuses.FINISHED }).then(() =>
    //   handleStopExerciseAndClassificate(),
    // );

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

  // TODO: hook maybe ???
  async function handleStopExerciseAndClassificate() {
    setIsClassificationPending(true);

    const PROMT = `В ходе выполнения задания были посещены сайты со следующими заголовками: ${urls.map((itm) => `"${itm.title}"`).join(",")}. Ответь "да" или "нет" на каждый заголовок в зависимости от того соотносится ли заголовок с темой задания "${name}" и кратко обоснуй почему. Хочу видеть ответ в виде "заголовок - да или нет - обоснование"`;

    // console.log(1, PROMT);

    // TODO: hook на fetch
    const [modelResponse] = await Promise.allSettled([
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
              content: PROMT,
            },
          ],
          stream: false,
        }),
      }),
      mutationRequest({ status: TExerciseStatuses.FINISHED }),
    ]);

    const text: { message: { content: string } } = await (
      modelResponse as { value: Response }
    ).value.json();

    const result = getTitledObjectsArray(text.message.content, urls);

    // console.log(2, result);

    // TODO: hook на fetch
    //  TODO: fix
    const backResponse = await fetch(`${BASE_BACK_URL}/urls`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(result),
    });

    setIsClassificationPending(false);

    if (backResponse.ok) {
      window.location.reload();
    }
  }

  return (
    <Button
      text={isClassifacationPending ? "Обработка..." : "Остановить"}
      disabled={isClassifacationPending}
      onClick={() => handleStopListening(id)}
    />
  );
};
