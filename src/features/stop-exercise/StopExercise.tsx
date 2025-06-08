import { Button } from "../../shared/ui";
import { useMutationRequest, BASE_BACK_URL } from "../../shared/lib";
import {
  TExerciseUpdateRequest,
  TExercise,
  TExerciseStatuses,
} from "../../shared/types";

export const StopExercise = ({
  id,
  setIsClassificationPending,
}: {
  id: number;
  setIsClassificationPending: (value: boolean) => void;
}) => {
  const { mutationRequest } = useMutationRequest<
    TExerciseUpdateRequest,
    TExercise
  >({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "PATCH",
  });

  const handleStopListening = (exerciseId: number) => {
    // mutationRequest({ status: TExerciseStatuses.FINISHED }).then(() =>
    //   window.location.reload(),
    // );

    // @ts-expect-error разбераюсь
    chrome.runtime.sendMessage(
      { action: "stopListening", exerciseId },
      (response: { status: string; exerciseId: number }) => {
        if (response.status === "stopped") {
          // handleStopExerciseAndClassificate();
          mutationRequest({ status: TExerciseStatuses.FINISHED });
        }
      },
    );
  };

  // TODO: hook maybe ???
  // @ts-expect-error iKnow
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              // content: `Ответь в виде массива JSON, где каждый элемент — это ответ "да" или "нет" при сравнении каждой из следующих фраз на соотношение фразы к фразе "Теория вероятности": ${data?.urls.map((itm) => itm.title).join(";")}`,
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
    // @ts-expect-error iKnow
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

  return <Button text="Остановить" onClick={() => handleStopListening(id)} />;
};
