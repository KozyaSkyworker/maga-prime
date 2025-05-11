import { useParams } from "react-router-dom";
import { DATA } from "../home/mock";

import styles from "./Exercise.module.css";

const Exercise = () => {
  const { id } = useParams();

  const item = DATA.find((itm) => itm.id === Number(id));

  return (
    <div>
      <h1 className={styles.Exercise__title}>{item?.name}</h1>
      <p>
        Время в работе: <span>{item?.time_spent}</span>
      </p>
      <div></div>
      <div>
        <p>
          <span>78% ????</span> - релевантный контент
        </p>
        <p>
          ???? До дедлайна: <span>2</span> дня
        </p>
      </div>
      <div></div>
      <div>
        <h2>Последние сайты:</h2>
        <ul>
          <li>first</li>
          <li>second seconds</li>
          <li>third third third third third</li>
          <li>fourth fourth fourth</li>
        </ul>
      </div>
    </div>
  );
};

export default Exercise;
