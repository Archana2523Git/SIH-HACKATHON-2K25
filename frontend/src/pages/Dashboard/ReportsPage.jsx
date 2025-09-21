import React, { useState } from 'react';
import { ReportGenerator } from '../components/common/ReportGenerator';
import { DetailedDataTable } from '../components/common/DetailedDataTable';

const ReportsPage = () => {
  const [reports, setReports] = useState([
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

  const handleGenerateReport = (reportData) => {
    // Simulate API call to generate report
    const newReport = {
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
            ? {
                ...report,
                status: 'completed',
                downloadUrl: `/reports/${report.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`
              }
            : report
        )
      );
    }, 3000);
  };

  const columns = [
    { id: 'name', label: 'Report Name', sortable: true },
    { id: 'type', label: 'Type', sortable: true },
    { id: 'dateGenerated', label: 'Date Generated', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false }
  ];

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      generating: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderRow = (report) => ({
    ...report,
    dateGenerated: formatDate(report.dateGenerated),
    status: renderStatusBadge(report.status),
    actions: (
      <div className="flex space-x-2">
        {report.status === 'completed' && (
          <a
            href={report.downloadUrl}
            download
            className="text-blue-600 hover:text-blue-800"
          >
            Download
          </a>
        )}
        <button className="text-gray-600 hover:text-gray-800">
          Share
        </button>
      </div>
    )
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <ReportGenerator onGenerate={handleGenerateReport} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DetailedDataTable
          columns={columns}
          data={reports}
          renderRow={renderRow}
          emptyMessage="No reports generated yet. Create your first report!"
          className="min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ReportsPage;
