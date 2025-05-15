import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";

import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import { ExerciseList } from "../../widgets/exercise-list";

import { TExercise } from "../../shared/types";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

import styles from "./Home.module.css";

const Home = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<TExercise[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://127.0.0.1:5000/exercises", {
          headers: {
            "Content-type": "application/json",
          },
        });
        const data: TExercise[] = await response.json();
        setExercises([...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleChangeSort = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleClickRedirectBtn = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <div>
      <h1>Задания</h1>
      <div className={styles.Home__top}>
        <Button
          variant="ghost"
          className={styles.Home__sort}
          onClick={handleChangeSort}
          title="Отсортировать по дате"
        >
          <SortIcon
            className={classNames(
              styles.Home__svg,
              styles[`Home__svg_${sort}`],
            )}
          />
        </Button>
        <Button text="Создать" variant="new" onClick={handleClickRedirectBtn} />
      </div>
      {isLoading && "Загрузка..."}
      {!isLoading && <ExerciseList items={exercises} />}
    </div>
  );
};

export default Home;
