import { FormEvent, useState } from "react";

import { BASE_BACK_URL, useMutationRequest } from "../../shared/lib";
import { TExercise, TExerciseRequest } from "../../shared/types";
import { Alert, type AlertProps, Button, Input } from "../../shared/ui";

import styles from "./ExerciseForm.module.css";

export const ExerciseForm = () => {
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState<AlertProps>();

  const { mutationRequest, isMutating } = useMutationRequest<
    TExerciseRequest,
    TExercise
  >({
    url: `${BASE_BACK_URL}/exercises`,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return;
    }

    const response = await mutationRequest({ name, user_id: 1 });

    if (response && response.status === 201) {
      setResponseMessage({
        text: "Задача создана успешно!",
        variant: "success",
      });
      setName("");
    } else {
      setResponseMessage({
        text: "Ошибка!",
        variant: "error",
      });
    }
  };

  return (
    <form className={styles.ExerciseForm} method="post" onSubmit={handleSubmit}>
      <label>
        <span className={styles.ExerciseForm__labelname}>Задание *</span>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <Button text="Создать" variant="new" disabled={!name || isMutating} />
      {responseMessage && (
        <Alert text={responseMessage.text} variant={responseMessage.variant} />
      )}
    </form>
  );
};
