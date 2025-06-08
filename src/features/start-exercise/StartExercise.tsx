import { Button } from "../../shared/ui";
import { useMutationRequest, BASE_BACK_URL } from "../../shared/lib";
import {
  TExerciseUpdateRequest,
  TExercise,
  TExerciseStatuses,
} from "../../shared/types";

export const StartExercise = ({ id }: { id: number }) => {
  const { mutationRequest } = useMutationRequest<
    TExerciseUpdateRequest,
    TExercise
  >({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "PATCH",
  });

  const handleStartListening = (exerciseId: number) => {
    // mutationRequest({ status: TExerciseStatuses.PROCESS }).then(() =>
    //   window.location.reload(),
    // );

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

  return (
    <Button
      text="Начать"
      onClick={() => handleStartListening(id)}
      variant="new"
    />
  );
};
