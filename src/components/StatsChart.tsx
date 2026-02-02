"use client";

import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartOptions } from "chart.js";

type IStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export default function StatsChart({ stats }: { stats: IStats[] }) {
  const data = {
    labels: stats.map((s) => s.stat.name),
    datasets: [
      {
        data: stats.map((b) => b.base_stat),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"radar"> & ChartOptions = {
    scales: {
      r: {
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
          color: "rgba(255, 99, 132, 0.2)",
        },
        beginAtZero: true,
        grid: {
          color: "rgba(255, 99, 132, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={data} options={chartOptions} />;
}
