import React, { useState, useEffect } from 'react';
import { WaterQualityFilterBar } from './WaterQualityFilterBar';
import { DetailedDataTable } from './DetailedDataTable';
import { DataChart } from './DataChart';
import { WaterQualityFilter, WaterQualityData, TableColumn } from '../types/common';

const WaterQualityPage: React.FC = () => {
  const [filters, setFilters] = useState<WaterQualityFilter>({
    timeRange: '24h',
    parameters: ['pH', 'turbidity', 'chlorine'],
    location: 'all'
  });

  const [loading, setLoading] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockWaterQualityData: WaterQualityData[] = [
    {
      id: 1,
      timestamp: '2025-01-21 10:00:00',
      location: 'Main Treatment Plant',
      parameter: 'pH',
      value: 7.2,
      unit: 'pH',
      status: 'normal'
    },
    {
      id: 2,
      timestamp: '2025-01-21 10:05:00',
      location: 'Main Treatment Plant',
      parameter: 'Turbidity',
      value: 2.1,
      unit: 'NTU',
      status: 'normal'
    },
    {
      id: 3,
      timestamp: '2025-01-21 10:10:00',
      location: 'Main Treatment Plant',
      parameter: 'Chlorine',
      value: 1.8,
      unit: 'mg/L',
      status: 'warning'
    },
    {
      id: 4,
      timestamp: '2025-01-21 10:15:00',
      location: 'Reservoir A',
      parameter: 'Temperature',
      value: 22.5,
      unit: '°C',
      status: 'warning'
    },
    {
      id: 5,
      timestamp: '2025-01-21 10:20:00',
      location: 'Reservoir A',
      parameter: 'TDS',
      value: 350,
      unit: 'mg/L',
      status: 'normal'
    }
  ];

  const [filteredData, setFilteredData] = useState<WaterQualityData[]>(mockWaterQualityData);

  // Simulate filtering data based on filters
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockWaterQualityData;

      if (filters.location !== 'all') {
        filtered = filtered.filter(item => item.location === filters.location);
      }

      if (filters.parameters.length > 0) {
        filtered = filtered.filter(item => filters.parameters.includes(item.parameter.toLowerCase()));
      }

      setFilteredData(filtered);
      setLoading(false);
    }, 500);
  }, [filters]);

  // Chart data for the selected parameters
  const chartData = {
    labels: filteredData.map(item => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Values',
        data: filteredData.map(item => item.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      }
    ]
  };

  const columns: TableColumn<WaterQualityData>[] = [
    {
      key: 'timestamp',
      title: 'Timestamp',
      sortable: true,
      renderCell: (row) => new Date(row.timestamp).toLocaleString()
    },
    {
      key: 'location',
      title: 'Location',
      sortable: true
    },
    {
      key: 'parameter',
      title: 'Parameter',
      sortable: true
    },
    {
      key: 'value',
      title: 'Value',
      sortable: true,
      renderCell: (row) => `${row.value} ${row.unit}`
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      renderCell: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          row.status === 'normal'
            ? 'bg-green-100 text-green-800'
            : row.status === 'warning'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Water Quality Monitoring</h1>
        <p className="text-gray-600">Monitor and analyze water quality parameters across all locations</p>
      </div>

      {/* Filters */}
      <WaterQualityFilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Chart */}
      <DataChart
        type="line"
        data={chartData}
        title="Water Quality Trends"
        timeRange={filters.timeRange}
        onTimeRangeChange={(range) => setFilters({ ...filters, timeRange: range })}
      />

      {/* Data Table */}
      <DetailedDataTable
        data={filteredData}
        columns={columns}
        loading={loading}
        onExport={(data) => {
          const csvData = data.map(item => ({
            Timestamp: item.timestamp,
            Location: item.location,
            Parameter: item.parameter,
            Value: `${item.value} ${item.unit}`,
            Status: item.status
          }));
          // You can implement exportToCsv here
          console.log('Export data:', csvData);
        }}
      />
    </div>
  );
};

export default WaterQualityPage;
