import React, { useState } from 'react';
import { ReportGenerator } from '../components/common/ReportGenerator';
import { DetailedDataTable } from '../components/common/DetailedDataTable';
import { Report, TableColumn } from '../types/common';

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      name: 'Weekly Water Quality Summary',
      type: 'Weekly Summary',
      dateGenerated: '2025-01-15T10:30:00Z',
      status: 'completed',
      downloadUrl: '/reports/weekly-summary-2025-01-15.pdf'
    },
    {
      id: 2,
      name: 'Monthly Microplastics Analysis',
      type: 'Monthly Trends',
      dateGenerated: '2025-01-10T14:20:00Z',
      status: 'completed',
      downloadUrl: '/reports/monthly-analysis-2025-01-10.pdf'
    },
    {
      id: 3,
      name: 'System Performance Report',
      type: 'Quarterly Analysis',
      dateGenerated: '2025-01-01T09:15:00Z',
      status: 'completed',
      downloadUrl: '/reports/performance-report-2025-01-01.pdf'
    }
  ]);

  const handleGenerateReport = (reportData: any) => {
    // Simulate API call to generate report
    const newReport: Report = {
      id: reports.length + 1,
      name: reportData.reportName,
      type: reportData.reportType,
      dateGenerated: new Date().toISOString(),
      status: 'generating'
    };

    setReports(prev => [newReport, ...prev]);

    // Simulate report generation completion
    setTimeout(() => {
      setReports(prev =>
        prev.map(report =>
          report.id === newReport.id
            ? { ...report, status: 'completed' as const, downloadUrl: '/reports/generated-report.pdf' }
            : report
        )
      );
    }, 3000);
  };

  const handleDownloadReport = (report: Report) => {
    if (report.downloadUrl) {
      // In a real app, this would trigger a download
      console.log('Downloading report:', report.name);
      // window.open(report.downloadUrl, '_blank');
    }
  };

  const columns: TableColumn<Report>[] = [
    {
      key: 'name',
      title: 'Report Name',
      sortable: true
    },
    {
      key: 'type',
      title: 'Type',
      sortable: true
    },
    {
      key: 'dateGenerated',
      title: 'Date Generated',
      sortable: true,
      renderCell: (row) => new Date(row.dateGenerated).toLocaleDateString()
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      renderCell: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          row.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : row.status === 'generating'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      renderCell: (row) => (
        <button
          onClick={() => handleDownloadReport(row)}
          disabled={row.status !== 'completed'}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and manage system reports</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generator */}
        <div>
          <ReportGenerator
            onGenerate={handleGenerateReport}
            onCancel={() => console.log('Report generation cancelled')}
          />
        </div>

        {/* Reports Table */}
        <div>
          <DetailedDataTable
            data={reports}
            columns={columns}
            onRowClick={(row) => console.log('Row clicked:', row)}
            onExport={(data) => {
              const csvData = data.map(report => ({
                'Report Name': report.name,
                'Type': report.type,
                'Date Generated': report.dateGenerated,
                'Status': report.status
              }));
              console.log('Export data:', csvData);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
