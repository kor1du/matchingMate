import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./matchingChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function MatchingChart(props) {
  const { matchingCountLabelList, matchingCountDataList } = props;

  const data = {
    labels: matchingCountLabelList,
    datasets: [
      {
        type: "line",
        borderColor: "#74b9ff",
        backgroundColor: "#fdcb6e",
        borderWidth: 4,
        pointBorderWidth: 10,
        pointBorderColor: "#fdcb6e",
        fill: false,
        label: "매칭 횟수 ",
        fontSize: 15,
        data: matchingCountDataList,
      },
    ],
    plugins: [ChartDataLabels],
  };

  const options = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },

      datalabels: {
        formatter: function (value) {
          if (Number(value) === 0) return null;
          return value + "회";
        },

        color: "black",
        font: {
          size: 15,
          weight: 500,
        },
        align: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 15,
          },
        },
      },
      y: {
        min: 0,
        max: (parseInt(Math.max(...matchingCountDataList) / 5) + 1) * 5,
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          font: {
            size: 15,
          },

          callback: function (value) {
            return value.toLocaleString("ko-KR") + "회";
          },
        },
      },
    },
    layout: {
      margin: {
        top: 50,
      },
    },
  };

  return (
    <div className="chart-matching">
      <div className="chart">
        <p>매칭횟수</p>
        <Line options={options} data={data} width={300} height={200} />
      </div>
    </div>
  );
}

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement("thead");

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = 0;

      const th = document.createElement("th");
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement("span");
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = "2px";
      span.style.marginRight = "10px";
      span.style.height = "10px";
      span.style.width = "10px";
      span.style.display = "inline-block";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;

      const td = document.createElement("td");
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
};
