import { FC } from "react";
import classNames from "classnames";

import { TExercise } from "../../shared/types";

import { ExerciseCard } from "../exercise-card/ExerciseCard";

import styles from "./ExerciseLIst.module.css";

interface Props {
  className?: string;
  classNameList?: string;
  items: TExercise[];
}

export const ExerciseList: FC<Props> = ({
  className = "",
  classNameList = "",
  items,
}) => {
  return (
    <div className={className}>
      {items.length === 0 ? (
        <h2>Задания не найдены</h2>
      ) : (
        <ul className={classNames(styles.ExerciseList, classNameList)}>
          {items.map((itm) => (
            <li key={itm.id}>
              <ExerciseCard {...itm} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
