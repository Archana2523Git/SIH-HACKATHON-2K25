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
import { classNames } from '../../utils/helpers';

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

export default function DashboardChart({
  title,
  data,
  options = {},
  className = '',
  height = 300,
  showLegend = true,
}) {
  // Ensure data has the required structure
  const chartData = {
    labels: data?.labels || [],
    datasets: data?.datasets?.map(dataset => ({
      ...dataset,
      data: dataset.data || [],
      fill: dataset.fill !== undefined ? dataset.fill : true,
      tension: dataset.tension || 0.1,
      borderWidth: dataset.borderWidth || 2,
      pointRadius: dataset.pointRadius || 3,
      pointHoverRadius: dataset.pointHoverRadius || 5,
    })) || []
  };

  if (!data || !data.datasets || data.datasets.length === 0) {
    return (
      <div className={classNames("flex items-center justify-center h-full", className)}>
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }
  // Default options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          callback: function(value) {
            return value.toLocaleString();
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
        backgroundColor: 'white',
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
    ...options,
  };

  // Merge default options with provided options
  const chartOptions = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      ...(options.plugins || {}),
    },
  };

  return (
    <div className={classNames("relative", className)} style={{ height }}>
      <Line data={chartData} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}
