import { FC } from "react";
import classNames from "classnames";

import { TExercise } from "../../shared/types";

import { ExerciseCard } from "../exercise-card/ExerciseCard";

import styles from "./ExerciseLIst.module.css";

interface Props {
  className?: string;
  items: TExercise[];
}

export const ExerciseList: FC<Props> = ({ className = "", items }) => (
  <ul className={classNames(styles.ExerciseList, className)}>
    {items.map((itm) => (
      <li key={itm.id}>
        <ExerciseCard {...itm} />
      </li>
    ))}
  </ul>
);
