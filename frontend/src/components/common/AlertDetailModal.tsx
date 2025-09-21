import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiBarChart3 } from 'react-icons/fi';
import { AlertDetailModalProps } from '../types/common';

export const AlertDetailModal: React.FC<AlertDetailModalProps> = ({
  isOpen,
  onClose,
  alertData,
  onUpdateStatus
}) => {
  const [status, setStatus] = useState<'active' | 'resolved' | 'investigating'>('active');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (alertData) {
      setStatus(alertData.status);
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
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Alert Details - {alertData.parameter} Alert
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Alert Information */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-3">Alert Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Alert ID:</span>
                  <span className="text-sm font-medium">#{alertData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="text-sm font-medium">{alertData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Parameter:</span>
                  <span className="text-sm font-medium">{alertData.parameter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Value:</span>
                  <span className="text-sm font-medium">
                    {alertData.value} {alertData.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Timestamp:</span>
                  <span className="text-sm font-medium">
                    {new Date(alertData.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Severity:</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    alertData.severity === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : alertData.severity === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : alertData.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {alertData.severity}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Update Form */}
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-3">Update Status</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as typeof status)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add investigation notes or resolution details..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trend Chart */}
          <div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <FiBarChart3 className="h-5 w-5 text-gray-500 mr-2" />
                <h4 className="text-md font-medium text-gray-900">Parameter Trend</h4>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-gray-500 text-sm">
                  Chart visualization would go here showing the parameter trend leading up to the alert
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiSave className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
