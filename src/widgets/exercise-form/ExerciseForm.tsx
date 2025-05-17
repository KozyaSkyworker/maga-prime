import { FormEvent, useState } from "react";
import { Button, Input } from "../../shared/ui";

import styles from "./ExerciseForm.module.css";

export const ExerciseForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return;
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
      <Button text="Создать" variant="new" disabled={!name} />
    </form>
  );
};
