import { useState, useEffect } from 'react';
import DashboardCard from '../../components/Dashboard/DashboardCard';
import DashboardChart from '../../components/Dashboard/DashboardChart';

// Mock data - replace with real API calls
const mockUserLocations = [
  { id: 1, name: 'Home', address: '123 Main St, City', isPrimary: true },
  { id: 2, name: 'Office', address: '456 Work Ave, City', isPrimary: false },
];

const mockTimeSeriesData = {
  labels: Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }),
  datasets: [
    {
      label: 'Microplastic Count (particles/L)',
      data: [12, 15, 8, 20, 18, 14, 10],
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.3,
      fill: true,
    },
  ],
};

const mockAlerts = [
  { 
    id: 1, 
    message: 'Water quality alert at Home location', 
    timestamp: 'Today, 10:30 AM',
    severity: 'high',
    location: 'Home'
  },
  { 
    id: 2, 
    message: 'Monthly water quality report available', 
    timestamp: 'Yesterday',
    severity: 'medium',
    location: 'All Locations'
  },
  { 
    id: 3, 
    message: 'New tips for reducing microplastics', 
    timestamp: '2 days ago',
    severity: 'low',
    location: 'Tips'
  },
];

const UserDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [timeSeriesData, setTimeSeriesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [waterQuality, setWaterQuality] = useState({
    score: 85,
    status: 'Good',
    lastUpdated: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // based on the selectedLocation
        setTimeSeriesData(mockTimeSeriesData);
        setAlerts(mockAlerts);
        
        // Simulate different water quality based on location
        setWaterQuality({
          score: selectedLocation === 1 ? 85 : 92,
          status: selectedLocation === 1 ? 'Good' : 'Excellent',
          lastUpdated: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedLocation]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <div className="flex space-x-2">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(parseInt(e.target.value))}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            {mockUserLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} {location.isPrimary && '(Primary)'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Water Quality Score" className="text-center">
          <div className="mt-2">
            <div className="text-5xl font-bold text-gray-900">
              {waterQuality.score}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <div className={`mt-2 text-lg font-medium ${getStatusColor(waterQuality.status)}`}>
              {waterQuality.status}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Last updated: {waterQuality.lastUpdated}
            </p>
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Readings" className="text-center">
          <div className="h-48">
            <DashboardChart 
              data={timeSeriesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
              loading={isLoading}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Weekly microplastic count trend</p>
        </DashboardCard>
      </div>

      {/* Alerts */}
      <DashboardCard title="My Alerts">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.location}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {alert.timestamp}
                </span>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No new alerts
            </p>
          )}
        </div>
      </DashboardCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
          <div className="text-indigo-600">
            <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">View Report</span>
        </button>
        
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
          <div className="text-indigo-600">
            <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">History</span>
        </button>
        
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
          <div className="text-indigo-600">
            <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">Water Tips</span>
        </button>
        
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
          <div className="text-indigo-600">
            <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
