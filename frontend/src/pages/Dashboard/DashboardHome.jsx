import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiActivity,
  FiAlertTriangle,
  FiTrendingUp,
  FiClock,
  FiDroplet,
  FiFilter,
  FiBell,
  FiUsers,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import {
  DashboardCard,
  DashboardChart,
  DashboardTable,
  DashboardStats
} from '../../components/Dashboard';

// Helper function for conditional class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Sample data for the charts
const sampleChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Water Quality Index',
      data: [65, 78, 66, 89, 96, 82, 95],
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Sensor Readings',
      data: [45, 52, 68, 73, 85, 79, 88],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

// Sample table data
const tableColumns = [
  {
    key: 'id',
    header: 'ID',
    sortable: true,
  },
  {
    key: 'name',
    header: 'Sensor Name',
    sortable: true,
  },
  {
    key: 'location',
    header: 'Location',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.status === 'active' ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    key: 'lastReading',
    header: 'Last Reading',
    sortable: true,
    render: (row) => (
      <div className="text-sm text-gray-900">
        {row.lastReading} <span className="text-gray-500">mg/L</span>
      </div>
    ),
  },
];

const tableData = [
  { id: 1, name: 'Sensor 1', location: 'Main Reservoir', status: 'active', lastReading: '7.8' },
  { id: 2, name: 'Sensor 2', location: 'East Pipeline', status: 'active', lastReading: '8.2' },
  { id: 3, name: 'Sensor 3', location: 'West Pipeline', status: 'inactive', lastReading: '6.5' },
  { id: 4, name: 'Sensor 4', location: 'North Tank', status: 'active', lastReading: '7.1' },
  { id: 5, name: 'Sensor 5', location: 'South Tank', status: 'active', lastReading: '7.9' },
];

// Sample alerts data
const alerts = [
  {
    id: 1,
    type: 'warning',
    message: 'High turbidity detected in West Pipeline',
    time: '10 minutes ago',
  },
  {
    id: 2,
    type: 'critical',
    message: 'Low water pressure in North Tank',
    time: '2 hours ago',
  },
  {
    id: 3,
    type: 'info',
    message: 'Scheduled maintenance tomorrow at 2:00 PM',
    time: '1 day ago',
  },
];

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Water Quality Chart */}
      <div className="lg:col-span-2">
        <DashboardCard
          title="Water Quality Overview"
          subtitle="Last 7 days of water quality metrics"
          className="h-full"
        >
          <div className="h-80">
            <DashboardChart
              data={sampleChartData}
              options={{
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 40,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </DashboardCard>
      </div>

      {/* Recent Alerts */}
      <div>
        <DashboardCard
          title="Recent Alerts"
          subtitle="Latest system notifications"
          className="h-full"
          headerActions={
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
            >
              View All
            </button>
          }
        >
          <div className="flow-root">
            <ul className="-mb-8">
              {alerts.map((alert, alertIdx) => (
                <li key={alert.id}>
                  <div className="relative pb-8">
                    {alertIdx !== alerts.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            alert.type === 'critical'
                              ? 'bg-red-500'
                              : alert.type === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500',
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          <BellAlertIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-800">
                            {alert.message}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time>{alert.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DashboardCard>
      </div>
    </div>

    {/* Sensor Status Table */}
    <DashboardCard
      title="Sensor Status"
      subtitle="Overview of all connected sensors"
      className="mb-6"
    >
      <DashboardTable
        columns={tableColumns}
        data={tableData}
        searchable
        searchPlaceholder="Search sensors..."
        onRowClick={(row) => console.log('Row clicked:', row)}
        className="mt-4"
      />
    </DashboardCard>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
        noBorder
        noShadow
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-700 bg-opacity-30">
            <ArrowTrendingUpIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium">View Analytics</h3>
            <p className="text-xs opacity-80">Detailed insights & reports</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        className="bg-gradient-to-br from-green-500 to-green-600 text-white"
        noBorder
        noShadow
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-700 bg-opacity-30">
            <UserGroupIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium">Manage Team</h3>
            <p className="text-xs opacity-80">Add or remove team members</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        noBorder
        noShadow
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-700 bg-opacity-30">
            <ClockIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium">Schedule</h3>
            <p className="text-xs opacity-80">Set up maintenance tasks</p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        noBorder
        noShadow
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-700 bg-opacity-30">
            <ArrowPathIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium">System Status</h3>
            <p className="text-xs opacity-80">All systems operational</p>
          </div>
        </div>
      </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardHome;
