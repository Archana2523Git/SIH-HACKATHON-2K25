// src/pages/WaterQuality/WaterQuality.jsx
import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { 
  FiFilter, 
  FiDownload,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';

const WaterQuality = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [location, setLocation] = useState('all');

  // Mock data for charts
  const microplasticData = {
    labels: Array.from({length: 7}, (_, i) => `Day ${i+1}`),
    datasets: [{
      label: 'Microplastic Count (particles/L)',
      data: [5, 7, 8, 10, 12, 9, 8.2],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const parameterTrends = {
    labels: ['pH', 'Turbidity', 'Chlorine', 'Microplastics'],
    datasets: [{
      label: 'Current',
      data: [7.4, 1.2, 2.1, 8.2],
      backgroundColor: '#3B82F6'
    }, {
      label: 'Previous',
      data: [7.2, 1.5, 2.3, 7.8],
      backgroundColor: '#9CA3AF'
    }]
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Water Quality Analysis</h1>
        <div className="flex space-x-4">
          <button className="btn btn-outline">
            <FiDownload className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Time Range</label>
            <select 
              className="select select-bordered w-full"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select 
              className="select select-bordered w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="reservoir-a">Reservoir A</option>
              <option value="reservoir-b">Reservoir B</option>
              <option value="pipeline-main">Main Pipeline</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn btn-primary w-full">
              <FiFilter className="mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Microplastic Levels Over Time</h2>
          <div className="h-80">
            <Line 
              data={microplasticData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Particles/L'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Parameter Comparison</h2>
          <div className="h-80">
            <Bar 
              data={parameterTrends}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Detailed Readings</h2>
          <div className="flex space-x-2">
            <button className="btn btn-ghost btn-sm">
              <FiCalendar className="mr-1" />
              Select Date Range
            </button>
            <button className="btn btn-ghost btn-sm">
              <FiMapPin className="mr-1" />
              Compare Locations
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Microplastics</th>
                <th>pH Level</th>
                <th>Turbidity</th>
                <th>Chlorine</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4,5].map((item) => (
                <tr key={item}>
                  <td>2023-06-{10+item} 08:00</td>
                  <td>Reservoir {String.fromCharCode(64+item)}</td>
                  <td>{(Math.random() * 10).toFixed(1)}/L</td>
                  <td>7.{Math.floor(Math.random() * 3) + 2}</td>
                  <td>{(Math.random() * 3).toFixed(1)} NTU</td>
                  <td>{(Math.random() * 3).toFixed(1)} mg/L</td>
                  <td>
                    <span className={`badge ${Math.random() > 0.3 ? 'badge-success' : 'badge-warning'}`}>
                      {Math.random() > 0.3 ? 'Normal' : 'Warning'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;