import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps } from '../types/common';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DataChart: React.FC<ChartProps> = ({
  type,
  data,
  title,
  timeRange = '24h',
  onTimeRangeChange
}) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
        beginAtZero: type === 'bar',
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    hover: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const timeRangeOptions = ['24h', '7d', '30d', '90d'];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {onTimeRangeChange && (
          <div className="flex space-x-2">
            {timeRangeOptions.map((option) => (
              <button
                key={option}
                onClick={() => onTimeRangeChange(option)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === option
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="h-80">
        <Chart type={type} data={data} options={chartOptions} />
      </div>
    </div>
  );
};
