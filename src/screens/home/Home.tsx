import { ExerciseList } from "../../widgets/exercise-list";

import { DATA } from "./mock";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <h1>Задания</h1>
      <ExerciseList items={DATA} className={styles.Home__list} />
    </div>
  );
};

export default Home;
