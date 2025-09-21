import { useState, useEffect } from 'react';
import DashboardCard from '../../components/Dashboard/DashboardCard';
import DashboardChart from '../../components/Dashboard/DashboardChart';
import DashboardTable from '../../components/Dashboard/DashboardTable';

// Mock data - replace with real API calls
const mockTimeSeriesData = {
  labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
  datasets: [
    {
      label: 'Microplastic Count (particles/L)',
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50) + 10),
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.3,
      fill: true,
    },
  ],
};

const mockPolymerData = {
  labels: ['Polyethylene', 'Polypropylene', 'Polystyrene', 'Other'],
  datasets: [
    {
      data: [45, 25, 15, 15],
      backgroundColor: [
        'rgba(79, 70, 229, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(199, 210, 254, 0.8)',
      ],
      borderWidth: 1,
    },
  ],
};

const mockSampleData = [
  { 
    id: 1, 
    timestamp: '2023-09-21 10:30:00', 
    location: 'Location A', 
    count: 24, 
    polymer: 'Polyethylene',
    size: '0.5mm'
  },
  { 
    id: 2, 
    timestamp: '2023-09-21 09:15:00', 
    location: 'Location B', 
    count: 18, 
    polymer: 'Polypropylene',
    size: '0.3mm'
  },
  // Add more sample data as needed
];

const sampleColumns = [
  { key: 'timestamp', header: 'Timestamp', sortable: true },
  { key: 'location', header: 'Location', sortable: true },
  { key: 'count', header: 'Count (particles/L)', sortable: true },
  { key: 'polymer', header: 'Polymer Type', sortable: true },
  { key: 'size', header: 'Avg. Size', sortable: true },
];

const ResearcherDashboard = () => {
  const [timeSeriesData, setTimeSeriesData] = useState({});
  const [polymerData, setPolymerData] = useState({});
  const [samples, setSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'High microplastic concentration detected at Location A', timestamp: '10:30 AM', severity: 'high' },
    { id: 2, message: 'New data available for analysis', timestamp: '9:15 AM', severity: 'medium' },
    { id: 3, message: 'System calibration completed', timestamp: 'Yesterday', severity: 'low' },
  ]);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        setTimeSeriesData(mockTimeSeriesData);
        setPolymerData(mockPolymerData);
        setSamples(mockSampleData);
      } catch (error) {
        console.error('Error fetching researcher data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSampleClick = (sample) => {
    // Handle sample row click (e.g., navigate to sample details)
    console.log('Sample clicked:', sample);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Researcher Dashboard</h1>
      
      {/* Time Series Chart */}
      <DashboardCard title="Microplastic Count Over Time" className="mt-6">
        <div className="h-80">
          <DashboardChart 
            data={timeSeriesData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Particles/L'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Time'
                  }
                }
              }
            }}
            loading={isLoading}
          />
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Polymer Distribution */}
        <DashboardCard title="Polymer Distribution">
          <div className="h-64">
            <DashboardChart 
              type="pie"
              data={polymerData}
              loading={isLoading}
            />
          </div>
        </DashboardCard>

        {/* Alerts */}
        <DashboardCard title="Recent Alerts">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-3 rounded-md ${
                  alert.severity === 'high' 
                    ? 'bg-red-50 text-red-800' 
                    : alert.severity === 'medium'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'bg-blue-50 text-blue-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Sample Data Table */}
      <DashboardCard title="Recent Samples" className="mt-6">
        <DashboardTable
          columns={sampleColumns}
          data={samples}
          onRowClick={handleSampleClick}
          loading={isLoading}
          searchable={true}
          searchPlaceholder="Search samples..."
          className="mt-4"
        />
      </DashboardCard>
    </div>
  );
};

export default ResearcherDashboard;
