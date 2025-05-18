import { FormEvent, useState } from "react";

import { BASE_BACK_URL, useMutationRequest } from "../../shared/lib";
import { TExercise, TExerciseRequest } from "../../shared/types";
import { Alert, Button, Input } from "../../shared/ui";

import styles from "./ExerciseForm.module.css";

export const ExerciseForm = () => {
  const [name, setName] = useState("");
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);

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
      setIsShowSuccessMessage(true);
      setName("");
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
      {isShowSuccessMessage && <Alert text="Задача создана успешно!" />}
    </form>
  );
};
