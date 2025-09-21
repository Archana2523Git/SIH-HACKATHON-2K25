import { WaterQualityData, StackedBarData, Experiment } from '../types/researcher';

export const mockWaterQualityData: WaterQualityData = {
  overview: {
    totalSamples: 1245,
    criticalIssues: 8,
    avgQualityScore: 86,
    lastUpdated: '2 minutes ago'
  },
  parameters: [
    { name: 'pH Level', value: 7.2, status: 'good', trend: 'up', change: '2.5%' },
    { name: 'Turbidity', value: 2.1, status: 'good', trend: 'down', change: '1.2%' },
    { name: 'Chlorine', value: 1.8, status: 'warning', trend: 'up', change: '5.1%' },
    { name: 'Temperature', value: 22.5, status: 'warning', trend: 'up', change: '3.2%' },
    { name: 'TDS', value: 350, status: 'good', trend: 'down', change: '0.8%' },
  ],
  alerts: [
    { 
      id: 1, 
      location: 'Main Treatment Plant', 
      parameter: 'Chlorine', 
      level: 'High', 
      value: '2.8 mg/L',
      time: '2 hours ago',
      status: 'unresolved'
    },
    { 
      id: 2, 
      location: 'Reservoir A', 
      parameter: 'Turbidity', 
      level: 'Critical', 
      value: '8.5 NTU',
      time: '4 hours ago',
      status: 'investigating'
    },
  ],
  locations: [
    { id: 1, name: 'Main Treatment Plant', status: 'online', samples: 245 },
    { id: 2, name: 'Reservoir A', status: 'warning', samples: 180 },
    { id: 3, name: 'Reservoir B', status: 'online', samples: 198 },
    { id: 4, name: 'Distribution Point 1', status: 'offline', samples: 0 },
    { id: 5, name: 'Distribution Point 2', status: 'online', samples: 156 },
  ]
};

export const mockStackedBarData: StackedBarData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { label: 'PE', data: [12, 9, 11, 10, 13, 12, 9], backgroundColor: 'rgba(59,130,246,0.8)' },
    { label: 'PP', data: [8, 7, 6, 7, 8, 9, 7], backgroundColor: 'rgba(16,185,129,0.8)' },
    { label: 'PET', data: [5, 6, 7, 6, 5, 6, 7], backgroundColor: 'rgba(234,179,8,0.8)' },
    { label: 'PVC', data: [3, 4, 3, 4, 3, 2, 3], backgroundColor: 'rgba(239,68,68,0.8)' },
  ],
};

export const mockExperiments: Experiment[] = [
  { id: 1, date: '2025-09-01', location: 'Site 1', purity: '94%', count: 12, status: 'Safe' },
  { id: 2, date: '2025-09-02', location: 'Site 2', purity: '91%', count: 15, status: 'Safe' },
  { id: 3, date: '2025-09-03', location: 'Site 3', purity: '76%', count: 38, status: 'Unsafe' },
  { id: 4, date: '2025-09-04', location: 'Site 4', purity: '88%', count: 19, status: 'Safe' },
  { id: 5, date: '2025-09-05', location: 'Site 5', purity: '82%', count: 24, status: 'Caution' },
];

export const mockHotspots = [
  { name: 'Reservoir X', severity: 'High', note: 'Particles/L spike' },
  { name: 'River Site 3', severity: 'Medium', note: 'Intermittent increase' },
  { name: 'Plant A', severity: 'Low', note: 'Stable readings' },
];
