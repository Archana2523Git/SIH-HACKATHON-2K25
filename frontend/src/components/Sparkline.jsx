import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Sparkline = ({ data, color = "#3b82f6" }) => {
  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        data: data,
        borderColor: color,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, `${color}33`); // 20% opacity
          gradient.addColorStop(1, `${color}00`); // 0% opacity
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      x: { 
        display: false,
        grid: { display: false },
        ticks: { display: false }
      }, 
      y: { 
        display: false,
        grid: { display: false },
        ticks: { display: false }
      } 
    },
    plugins: { 
      legend: { display: false }, 
      tooltip: { enabled: false } 
    },
    elements: {
      line: { borderJoinStyle: 'round' }
    }
  };

  return (
    <div style={{ height: "40px", width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Sparkline;
