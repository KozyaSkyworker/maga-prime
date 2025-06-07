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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "График",
    },
  },
};

const Report = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Отчет по заданию {id}</h1>
      <div>
        <div>
          <h2>График КАКИЕ по дням</h2>
        </div>
        <div>
          <h2>День / часы</h2>
        </div>
        <div>
          <h2>???</h2>
          <div>
            <Bar
              options={options}
              data={{
                labels: ["Wikipedia", "Search", "ULSU"],
                datasets: [
                  {
                    data: [1, 2, 3],
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
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
