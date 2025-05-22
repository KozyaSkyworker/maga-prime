import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import { ExerciseList } from "../../widgets/exercise-list";

import { BASE_BACK_URL, useFetchData } from "../../shared/lib";
import { TExerciseDto } from "../../shared/types";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

import styles from "./Home.module.css";

const Home = () => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const navigate = useNavigate();

  const { data, isLoading } = useFetchData<TExerciseDto[]>({
    url: `${BASE_BACK_URL}/exercises?sort=${sort}`,
  });

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
      {!isLoading && data && <ExerciseList items={data} />}
    </div>
  );
};

export default Home;
