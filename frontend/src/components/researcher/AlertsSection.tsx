import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { exportToCsv } from '../../utils/exportCsv';

interface Alert {
  id: number;
  site: string;
  level: 'High' | 'Medium' | 'Low';
  desc: string;
  time: string;
}

interface AlertsSectionProps {
  alerts: Alert[];
  onExport: () => void;
  isLoading: boolean;
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({ 
  alerts, 
  onExport, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Spikes & Alerts</h3>
        <button 
          onClick={onExport}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiDownload className="mr-1.5 h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-3 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">{alert.site}</p>
              <p className="text-xs text-gray-500">{alert.desc} • {alert.time}</p>
            </div>
            <span 
              className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                alert.level === 'High' 
                  ? 'bg-red-100 text-red-800' 
                  : alert.level === 'Medium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-blue-100 text-blue-800'
              }`}
            >
              {alert.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
