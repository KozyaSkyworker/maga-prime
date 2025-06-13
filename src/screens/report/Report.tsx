import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import classNames from "classnames";

import { BASE_BACK_URL, useFetchData } from "../../shared/lib";
import { TExercise } from "../../shared/types";

import { CHART_UI, COUNT_VISITS_OPTIONS, TIME_SPENT_OPTIONS } from "./model";

import styles from "./Report.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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

  const sitesRelevantCount: [number, number] = data.urls.reduce(
    (acc, itm) => {
      if (itm.is_relevant === 0) {
        return [acc[0] + 1, acc[1]];
      } else {
        return [acc[0], acc[1] + 1];
      }
    },
    [0, 0],
  );

  console.log(sitesRelevantCount);

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
            {/* TODO: копировать FULL линку (HREF) на клик */}
            <Bar
              height={CHART_UI.height}
              options={COUNT_VISITS_OPTIONS}
              data={{
                labels: data.urls.map((itm) => itm.origin),
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
          <h2>Соотношение релевантных веб-сайтов</h2>
          <div>
            <Pie
              height={CHART_UI.height}
              options={TIME_SPENT_OPTIONS}
              plugins={[ChartDataLabels]}
              data={{
                labels: ["Нет", "Да"],
                datasets: [
                  {
                    datalabels: {
                      color: "#000",
                      font: {
                        size: 33,
                      },
                    },
                    data: sitesRelevantCount,
                    backgroundColor: ["rgba(255,0,0, .5", "rgba(0,255,0, .5)"],
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
