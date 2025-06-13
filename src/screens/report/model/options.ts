import { ChartOptions } from "chart.js";

export const COUNT_VISITS_OPTIONS: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Кол-во посещений",
      },
    },
    x: {
      title: {
        display: true,
        text: "URLs",
      },
    },
  },
};

export const TIME_SPENT_OPTIONS: ChartOptions<"pie"> = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
