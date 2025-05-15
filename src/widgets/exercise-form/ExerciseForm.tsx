import { Button, Input } from "../../shared/ui";

import styles from "./ExerciseForm.module.css";

export const ExerciseForm = () => {
  return (
    <form className={styles.ExerciseForm}>
      <label>
        <span className={styles.ExerciseForm__labelname}>Задание</span>
        <Input />
      </label>
      <Button text="Создать" variant="new" />
    </form>
  );
};
