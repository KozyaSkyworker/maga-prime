import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import classNames from "classnames";

import { BASE_BACK_URL, useFetchData } from "../../shared/lib";

import { CHART_UI, COUNT_VISITS_OPTIONS, TIME_SPENT_OPTIONS } from "./model";

import styles from "./Report.module.css";
import { TExercise } from "../../shared/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Report = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchData<TExercise>({
    url: `${BASE_BACK_URL}/reports/${id}`,
  });

  if (isLoading) {
    return "SPINNER";
  }

  if (!data) {
    return "Нед данных";
  }

  return (
    <div className={classNames(styles.Report, styles.column)}>
      <h1>
        Отчет по заданию: <br />
        {data.exercise.name}
      </h1>
      <div className={classNames(styles.Report__content, styles.column)}>
        <div className={classNames(styles.Report__chartWrapper, styles.column)}>
          <h2>Количество посещений веб-сайтов</h2>
          <div>
            {/* TODO: копировать FULL линку на клик */}
            <Bar
              height={CHART_UI.height}
              options={COUNT_VISITS_OPTIONS}
              data={{
                labels: data.urls.map((itm) => itm.url),
                datasets: [
                  {
                    data: data.urls.map((itm) => itm.visits_count),
                    backgroundColor: CHART_UI.backgroundColor,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className={classNames(styles.Report__chartWrapper, styles.column)}>
          <h2>Время, проведенное на веб-сайтах</h2>
          <div>
            <Bar
              height={CHART_UI.height}
              options={TIME_SPENT_OPTIONS}
              data={{
                labels: ["Wikipedia", "Search", "ULSU"],
                datasets: [
                  {
                    data: [27, 89, 5],
                    backgroundColor: CHART_UI.backgroundColor,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
