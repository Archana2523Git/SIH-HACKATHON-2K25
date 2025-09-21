import { createContext, useContext, useState, useEffect } from 'react';

const SensorContext = createContext(null);

// Mock data for demonstration
const MOCK_SENSOR_DATA = {
  temperature: 24.5,
  humidity: 65,
  airQuality: 'Good',
  lastUpdated: new Date().toISOString(),
  history: Array(24).fill(0).map((_, i) => ({
    time: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    temperature: 20 + Math.sin(i / 2) * 5 + Math.random() * 2,
    humidity: 60 + Math.sin(i / 3) * 10 + Math.random() * 5,
  })),
};

export const SensorProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState(MOCK_SENSOR_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: 20 + Math.sin(Date.now() / 1000000) * 5 + Math.random() * 2,
        humidity: 60 + Math.sin(Date.now() / 1500000) * 10 + Math.random() * 5,
        lastUpdated: new Date().toISOString(),
        history: [
          ...prev.history.slice(1),
          {
            time: new Date().toISOString(),
            temperature: 20 + Math.sin(Date.now() / 1000000) * 5 + Math.random() * 2,
            humidity: 60 + Math.sin(Date.now() / 1500000) * 10 + Math.random() * 5,
          },
        ],
      }));
    }, 5000);

    // Initial data load
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch sensor data:', err);
        setError('Failed to load sensor data');
        setLoading(false);
      }
    };

    fetchData();
    return () => clearInterval(interval);
  }, []);

  const value = {
    sensorData,
    loading,
    error,
    refreshData: async () => {
      // In a real app, this would refetch data from the API
      console.log('Refreshing sensor data...');
    },
  };

  return (
    <SensorContext.Provider value={value}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensors = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error('useSensors must be used within a SensorProvider');
  }
  return context;
};

export default SensorContext;
