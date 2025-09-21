import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiBarChart3 } from 'react-icons/fi';

const AlertDetailModal = ({
  isOpen,
  onClose,
  alertData,
  onUpdateStatus
}) => {
  const [status, setStatus] = useState('active');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (alertData) {
      setStatus(alertData.status || 'active');
      setNotes(alertData.notes || '');
    }
  }, [alertData]);

  const handleSave = () => {
    if (alertData) {
      onUpdateStatus(alertData.id, status, notes);
      onClose();
    }
  };

  const handleClose = () => {
    setStatus(alertData?.status || 'active');
    setNotes(alertData?.notes || '');
    onClose();
  };

  if (!isOpen || !alertData) return null;

  // Mock trend data for the chart
  const trendData = {
    labels: ['1h ago', '30m ago', '15m ago', '5m ago', 'Now'],
    datasets: [
      {
        label: alertData.parameter,
        data: [
          alertData.value - 2,
          alertData.value - 1,
          alertData.value - 0.5,
          alertData.value + 0.5,
          alertData.value
        ],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getSeverityBadge = (severity) => {
    let bgColor = '';
    let text = '';
    
    switch (severity.toLowerCase()) {
      case 'high':
        bgColor = 'bg-red-100 text-red-800';
        text = 'High';
        break;
      case 'medium':
        bgColor = 'bg-yellow-100 text-yellow-800';
        text = 'Medium';
        break;
      case 'low':
      default:
        bgColor = 'bg-blue-100 text-blue-800';
        text = 'Low';
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Alert Details
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Alert Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-medium">{alertData.title}</h4>
              <div className="flex space-x-2">
                {getSeverityBadge(alertData.severity)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alertData.status)}`}>
                  {alertData.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Detected at {new Date(alertData.timestamp).toLocaleString()}
            </p>
          </div>
          
          {/* Alert Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
              <p className="text-gray-900">{alertData.location || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Parameter</h4>
              <p className="text-gray-900">{alertData.parameter || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Value</h4>
              <p className="text-gray-900">{alertData.value} {alertData.unit || ''}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Threshold</h4>
              <p className="text-gray-900">{alertData.threshold} {alertData.unit || ''}</p>
            </div>
          </div>
          
          {/* Trend Chart */}
          <div className="mt-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FiBarChart3 className="mr-2" />
              <span>Trend Analysis</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg h-48 flex items-center justify-center">
              {/* In a real app, you would use a charting library here */}
              <div className="text-center text-gray-400">
                <p>Trend chart would be displayed here</p>
                <p className="text-xs">(Mock data: {JSON.stringify(trendData.datasets[0].data)})</p>
              </div>
            </div>
          </div>
          
          {/* Status Update */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {['active', 'investigating', 'resolved'].map((s) => (
                <label key={s} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                  <span className="ml-2 text-gray-700 capitalize">{s}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                rows="3"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                placeholder="Add any notes about this alert..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiSave className="-ml-1 mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailModal;
