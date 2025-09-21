import React, { useState } from 'react';
import { DetailedDataTable } from '../components/common/DetailedDataTable';
import { AlertDetailModal } from '../components/common/AlertDetailModal';
import { Alert, TableColumn } from '../types/common';

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      timestamp: '2025-01-21T10:30:00Z',
      location: 'Main Treatment Plant',
      parameter: 'Chlorine',
      value: 2.8,
      unit: 'mg/L',
      status: 'active',
      severity: 'high',
      notes: ''
    },
    {
      id: 2,
      timestamp: '2025-01-21T09:45:00Z',
      location: 'Reservoir A',
      parameter: 'Turbidity',
      value: 8.5,
      unit: 'NTU',
      status: 'investigating',
      severity: 'critical',
      notes: 'Investigating possible contamination source'
    },
    {
      id: 3,
      timestamp: '2025-01-21T08:20:00Z',
      location: 'River Site 3',
      parameter: 'pH',
      value: 6.2,
      unit: 'pH',
      status: 'resolved',
      severity: 'medium',
      notes: 'Issue resolved - equipment calibration required'
    },
    {
      id: 4,
      timestamp: '2025-01-21T07:15:00Z',
      location: 'Reservoir B',
      parameter: 'Temperature',
      value: 28.5,
      unit: '°C',
      status: 'active',
      severity: 'medium',
      notes: ''
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (alertId: number, status: Alert['status'], notes?: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, status, notes }
          : alert
      )
    );
  };

  const columns: TableColumn<Alert>[] = [
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
      key: 'severity',
      title: 'Severity',
      sortable: true,
      renderCell: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          row.severity === 'critical'
            ? 'bg-red-100 text-red-800'
            : row.severity === 'high'
            ? 'bg-orange-100 text-orange-800'
            : row.severity === 'medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {row.severity}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      renderCell: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          row.status === 'active'
            ? 'bg-red-100 text-red-800'
            : row.status === 'investigating'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  // Summary cards data
  const summaryStats = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
    resolvedToday: alerts.filter(a => a.status === 'resolved' && new Date(a.timestamp).toDateString() === new Date().toDateString()).length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">System Alerts</h1>
        <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Alerts</h3>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalAlerts}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Alerts</h3>
          <p className="text-2xl font-bold text-red-600">{summaryStats.activeAlerts}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Critical Alerts</h3>
          <p className="text-2xl font-bold text-red-600">{summaryStats.criticalAlerts}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Resolved Today</h3>
          <p className="text-2xl font-bold text-green-600">{summaryStats.resolvedToday}</p>
        </div>
      </div>

      {/* Alerts Table */}
      <DetailedDataTable
        data={alerts}
        columns={columns}
        onRowClick={handleRowClick}
        onExport={(data) => {
          const csvData = data.map(alert => ({
            Timestamp: alert.timestamp,
            Location: alert.location,
            Parameter: alert.parameter,
            Value: `${alert.value} ${alert.unit}`,
            Severity: alert.severity,
            Status: alert.status
          }));
          console.log('Export data:', csvData);
        }}
      />

      {/* Alert Detail Modal */}
      <AlertDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alertData={selectedAlert}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AlertsPage;
