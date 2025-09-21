import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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

export default function LineChart({ title, data, options = {}, className = '' }) {
  // Ensure data has the required structure
  const chartData = {
    labels: data?.labels || [],
    datasets: data?.datasets?.map(dataset => ({
      ...dataset,
      data: dataset.data || [],
      fill: dataset.fill !== undefined ? dataset.fill : true,
      tension: dataset.tension || 0.4,
      borderWidth: dataset.borderWidth || 2,
      pointRadius: dataset.pointRadius || 3,
      pointHoverRadius: dataset.pointHoverRadius || 5,
    })) || []
  };

  if (!data || !data.datasets || data.datasets.length === 0) {
    return (
      <div className={`bg-white p-4 rounded-lg shadow ${className} flex items-center justify-center`} style={{ height: '300px' }}>
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        fill: true,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
    maintainAspectRatio: false,
    ...options,
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`} style={{ height: '300px' }}>
      <Line options={defaultOptions} data={chartData} />
    </div>
  );
}
