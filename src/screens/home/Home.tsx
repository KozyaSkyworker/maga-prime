import { useEffect, useState } from "react";

import { ExerciseList } from "../../widgets/exercise-list";

import { TExercise } from "../../shared/types";

import styles from "./Home.module.css";

const Home = () => {
  const [exercises, setExercises] = useState<TExercise[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://127.0.0.1:5000/exercises", {
        headers: {
          "Content-type": "application/json",
        },
      });
      const data: TExercise[] = await response.json();
      setExercises([...data]);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Задания</h1>
      <ExerciseList items={exercises} className={styles.Home__list} />
    </div>
  );
};

export default Home;
