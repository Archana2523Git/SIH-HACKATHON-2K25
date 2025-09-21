import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { WaterQualityFilter } from '../types/common';

interface WaterQualityFilterBarProps {
  filters: WaterQualityFilter;
  onFiltersChange: (filters: WaterQualityFilter) => void;
}

export const WaterQualityFilterBar: React.FC<WaterQualityFilterBarProps> = ({
  filters,
  onFiltersChange
}) => {
  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
  ];

  const parameterOptions = [
    { value: 'pH', label: 'pH Level' },
    { value: 'turbidity', label: 'Turbidity' },
    { value: 'chlorine', label: 'Chlorine' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'tds', label: 'TDS' },
    { value: 'microplastics', label: 'Microplastics' },
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'main-treatment', label: 'Main Treatment Plant' },
    { value: 'reservoir-a', label: 'Reservoir A' },
    { value: 'reservoir-b', label: 'Reservoir B' },
    { value: 'river-site-1', label: 'River Site 1' },
    { value: 'river-site-2', label: 'River Site 2' },
    { value: 'river-site-3', label: 'River Site 3' },
  ];

  const handleTimeRangeChange = (value: string) => {
    onFiltersChange({ ...filters, timeRange: value });
  };

  const handleParameterChange = (parameter: string, checked: boolean) => {
    const updatedParameters = checked
      ? [...filters.parameters, parameter]
      : filters.parameters.filter(p => p !== parameter);

    onFiltersChange({ ...filters, parameters: updatedParameters });
  };

  const handleLocationChange = (value: string) => {
    onFiltersChange({ ...filters, location: value });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <FiFilter className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Time Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Range
          </label>
          <select
            value={filters.timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Parameters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parameters
          </label>
          <div className="space-y-2">
            {parameterOptions.map((option) => (
              <label key={option.value} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={filters.parameters.includes(option.value)}
                  onChange={(e) => handleParameterChange(option.value, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
