import React, { useState } from 'react';
import { FiFileText, FiCalendar, FiCheck } from 'react-icons/fi';
import { ReportGeneratorProps, ReportFormData } from '../types/common';

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  onGenerate,
  onCancel
}) => {
  const [formData, setFormData] = useState<ReportFormData>({
    reportName: '',
    reportType: 'weekly-summary',
    dateRange: {
      start: '',
      end: ''
    },
    parameters: []
  });

  const reportTypeOptions = [
    { value: 'weekly-summary', label: 'Weekly Summary' },
    { value: 'monthly-trends', label: 'Monthly Trends' },
    { value: 'quarterly-analysis', label: 'Quarterly Analysis' },
    { value: 'annual-report', label: 'Annual Report' },
    { value: 'custom-report', label: 'Custom Report' }
  ];

  const parameterOptions = [
    { value: 'microplastics', label: 'Microplastics' },
    { value: 'purity', label: 'Purity Levels' },
    { value: 'water-quality', label: 'Water Quality Parameters' },
    { value: 'alerts', label: 'System Alerts' },
    { value: 'performance', label: 'System Performance' },
    { value: 'maintenance', label: 'Maintenance Records' }
  ];

  const handleParameterChange = (parameter: string, checked: boolean) => {
    const updatedParameters = checked
      ? [...formData.parameters, parameter]
      : formData.parameters.filter(p => p !== parameter);

    setFormData({ ...formData, parameters: updatedParameters });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.reportName && formData.dateRange.start && formData.dateRange.end && formData.parameters.length > 0) {
      onGenerate(formData);
    }
  };

  const isFormValid = formData.reportName && formData.dateRange.start && formData.dateRange.end && formData.parameters.length > 0;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-6">
        <FiFileText className="h-6 w-6 text-blue-500 mr-3" />
        <h3 className="text-lg font-medium text-gray-900">Generate New Report</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Report Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Name
          </label>
          <input
            type="text"
            value={formData.reportName}
            onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter report name..."
            required
          />
        </div>

        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Type
          </label>
          <select
            value={formData.reportType}
            onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {reportTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dateRange.start}
                onChange={(e) => setFormData({
                  ...formData,
                  dateRange: { ...formData.dateRange, start: e.target.value }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dateRange.end}
                onChange={(e) => setFormData({
                  ...formData,
                  dateRange: { ...formData.dateRange, end: e.target.value }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Include Parameters
          </label>
          <div className="grid grid-cols-2 gap-2">
            {parameterOptions.map((option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={formData.parameters.includes(option.value)}
                  onChange={(e) => handleParameterChange(option.value, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheck className="mr-2 h-4 w-4" />
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
};
