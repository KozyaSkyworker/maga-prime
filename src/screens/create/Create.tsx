import { ExerciseForm } from "../../widgets/exercise-form";

import styles from "./Create.module.css";

const Create = () => {
  return (
    <div className={styles.Create}>
      <h1>Создание задания</h1>
      <ExerciseForm />
    </div>
  );
};

export default Create;
