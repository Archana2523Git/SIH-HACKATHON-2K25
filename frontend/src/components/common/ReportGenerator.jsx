import React, { useState } from 'react';
import { FiFileText, FiCalendar, FiCheck } from 'react-icons/fi';

const ReportGenerator = ({
  onGenerate,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    reportName: '',
    reportType: 'weekly-summary',
    dateRange: {
      start: '',
      end: ''
    },
    parameters: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleParameterChange = (parameter, checked) => {
    const updatedParameters = checked
      ? [...formData.parameters, parameter]
      : formData.parameters.filter(p => p !== parameter);

    setFormData({ ...formData, parameters: updatedParameters });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.reportName && formData.dateRange.start && formData.dateRange.end && formData.parameters.length > 0) {
      setIsGenerating(true);
      onGenerate(formData);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          reportName: '',
          reportType: 'weekly-summary',
          dateRange: { start: '', end: '' },
          parameters: []
        });
        setIsGenerating(false);
        setIsOpen(false);
      }, 2000);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FiFileText className="mr-2 h-4 w-4" />
        Generate Report
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-medium text-gray-900">Generate New Report</h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reportName" className="block text-sm font-medium text-gray-700">
                  Report Name
                </label>
                <input
                  type="text"
                  name="reportName"
                  id="reportName"
                  value={formData.reportName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
                  Report Type
                </label>
                <select
                  id="reportType"
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {reportTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="start"
                      id="startDate"
                      value={formData.dateRange.start}
                      onChange={handleDateChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="end"
                      id="endDate"
                      value={formData.dateRange.end}
                      onChange={handleDateChange}
                      min={formData.dateRange.start}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Parameters
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {parameterOptions.map((param) => (
                    <div key={param.value} className="flex items-center">
                      <input
                        id={`param-${param.value}`}
                        name={`param-${param.value}`}
                        type="checkbox"
                        checked={formData.parameters.includes(param.value)}
                        onChange={(e) => handleParameterChange(param.value, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`param-${param.value}`} className="ml-2 block text-sm text-gray-700">
                        {param.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating || formData.parameters.length === 0}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isGenerating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiFileText className="-ml-1 mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportGenerator;
