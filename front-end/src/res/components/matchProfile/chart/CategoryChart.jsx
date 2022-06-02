import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./categoryChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function CategoryChart(props) {
  const { nickname, categoryLabelList, categoryDataList } = props;

  const data = {
    labels: categoryLabelList,
    datasets: [
      {
        data: categoryDataList,

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],

        borderWidth: 1,
        hoverOffset: 1,
      },
    ],
    plugins: [ChartDataLabels],
  };

  const options = {
    responsive: true,
    rotation: Math.PI * -28.9,

    layout: {
      padding: {
        bottom: 10,
      },
    },

    plugins: {
      legend: {
        display: true,
        position: "bottom",

        labels: {
          font: {
            size: 13,
          },
        },
      },

      datalabels: {
        formatter: function (value, context) {
          var idx = context.dataIndex;
          if (Number(value) === 0) return null;
          return context.chart.data.labels[idx] + "\n" + value + "회";
        },

        color: "black",
        font: {
          size: 15,
          weight: 500,
        },
      },
    },
  };

  return (
    <div className="chart-category">
      <div className="chart">
        <p>종목</p>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
