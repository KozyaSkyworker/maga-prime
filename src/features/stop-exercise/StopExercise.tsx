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
    //   // window.location.reload(),
    //   handleStopExerciseAndClassificate(),
    // );

    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "stopListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        if (response.status === "stopped") {
          handleStopExerciseAndClassificate();
          // mutationRequest({ status: TExerciseStatuses.FINISHED });
        }
      },
    );
  };

  // TODO: hook maybe ???
  async function handleStopExerciseAndClassificate() {
    setIsClassificationPending(true);

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
              content: `В ходе выполнения задания были посещены сайты со следующими заголовками: ${urls.map((itm) => `"${itm.title}"`).join(",")}. Ответь "да" или "нет" на каждый заголовок в зависимости от того соотносится ли заголовок с темой задания "${name}" и кратко обоснуй почему. Хочу видеть ответ в виде "заголовок - да или нет - обоснование"`,
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

    // console.log(text.message.content);

    const result = getTitledObjectsArray(text.message.content, urls);

    // console.log(result);

    // Вот ответы и обоснования:
    //
    // *   **Теория вероятности:** да - Заголовок напрямую относится к теме задания.
    // *   **Базы данных:** нет - Базы данных - это инструмент, а не сама тема вероятности.
    // *   **Котики:** нет - Это развлечение, никак не связанное с теорией вероятности.
    // *   **YouTube:** нет - YouTube - это платформа для обмена видео, а не тема, связанная с теорией вероятности.

    // Вот ответы и обоснования:
    //
    // * **Теория построения графов:** нет. Графы – полезный инструмент в ИИ, но не являются основной темой ИИ как таковой.
    // * **ИИ:** да. Это напрямую связанная с темой.
    // * **Искусственный интеллект:** да. Это синоним предыдущего, поэтому полностью соответствует теме.
    // * **Котики:** нет. Котики не имеют прямого отношения к искусственному интеллекту.
    // * **Собачки:** нет. Собаки также не являются темой, связанной с искусственным интеллектом, за исключением некоторых специализированных приложений (например, распознавание пород). Надеюсь, это понятно!

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
