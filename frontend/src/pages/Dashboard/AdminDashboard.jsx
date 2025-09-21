import { useState, useEffect } from 'react';
import DashboardCard from '../../components/Dashboard/DashboardCard';
import DashboardTable from '../../components/Dashboard/DashboardTable';
import { classNames } from '../../utils/helpers';

// Mock data - replace with real API calls
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastActive: '2023-09-21' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Researcher', lastActive: '2023-09-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', lastActive: '2023-09-19' },
];

const mockSensors = [
  { id: 1, name: 'Sensor 1', location: 'Location A', status: 'online', lastReading: '2023-09-21 10:30:00' },
  { id: 2, name: 'Sensor 2', location: 'Location B', status: 'offline', lastReading: '2023-09-20 15:45:00' },
  { id: 3, name: 'Sensor 3', location: 'Location C', status: 'online', lastReading: '2023-09-21 09:15:00' },
];

const userColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'lastActive', header: 'Last Active', sortable: true },
];

const sensorColumns = [
  { key: 'name', header: 'Sensor Name', sortable: true },
  { key: 'location', header: 'Location', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => (
      <span className={classNames(
        'px-2 py-1 text-xs font-medium rounded-full',
        row.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      )}>
        {row.status}
      </span>
    )
  },
  { key: 'lastReading', header: 'Last Reading', sortable: true },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [systemUptime, setSystemUptime] = useState('99.9%');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        setUsers(mockUsers);
        setSensors(mockSensors);
        // Calculate system uptime (this would come from your backend)
        setSystemUptime('99.9%');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserRowClick = (user) => {
    // Handle user row click (e.g., navigate to user details)
    console.log('User clicked:', user);
  };

  const handleSensorRowClick = (sensor) => {
    // Handle sensor row click (e.g., navigate to sensor details)
    console.log('Sensor clicked:', sensor);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Users" className="text-center">
          <div className="mt-2 text-3xl font-semibold text-gray-900">
            {users.length}
          </div>
          <p className="mt-2 text-sm text-gray-500">Registered users in the system</p>
        </DashboardCard>
        
        <DashboardCard title="Active Sensors" className="text-center">
          <div className="mt-2 text-3xl font-semibold text-gray-900">
            {sensors.filter(s => s.status === 'online').length}/{sensors.length}
          </div>
          <p className="mt-2 text-sm text-gray-500">Sensors currently online</p>
        </DashboardCard>
        
        <DashboardCard title="System Uptime" className="text-center">
          <div className="mt-2 text-3xl font-semibold text-gray-900">
            {systemUptime}
          </div>
          <p className="mt-2 text-sm text-gray-500">Last 30 days</p>
        </DashboardCard>
      </div>

      {/* User Management */}
      <DashboardCard title="User Management" className="mt-6">
        <DashboardTable
          columns={userColumns}
          data={users}
          onRowClick={handleUserRowClick}
          loading={isLoading}
          searchable={true}
          searchPlaceholder="Search users..."
          className="mt-4"
        />
      </DashboardCard>

      {/* Sensor Status */}
      <DashboardCard title="Sensor Status" className="mt-6">
        <DashboardTable
          columns={sensorColumns}
          data={sensors}
          onRowClick={handleSensorRowClick}
          loading={isLoading}
          searchable={true}
          searchPlaceholder="Search sensors..."
          className="mt-4"
        />
      </DashboardCard>
    </div>
  );
};

export default AdminDashboard;
