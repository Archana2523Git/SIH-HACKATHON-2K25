export interface WaterQualityData {
  overview: {
    totalSamples: number;
    criticalIssues: number;
    avgQualityScore: number;
    lastUpdated: string;
  };
  parameters: Array<{
    name: string;
    value: number;
    status: 'good' | 'warning' | 'critical';
    trend: 'up' | 'down' | 'stable';
    change: string;
  }>;
  alerts: Array<{
    id: number;
    location: string;
    parameter: string;
    level: string;
    value: string;
    time: string;
    status: 'unresolved' | 'investigating' | 'resolved';
  }>;
  locations: Array<{
    id: number;
    name: string;
    status: 'online' | 'offline' | 'warning';
    samples: number;
  }>;
}

export interface FilterState {
  date: string;
  polymer: string;
  location: string;
  device: string;
}

export interface StackedBarData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
}

export interface Experiment {
  id: number;
  date: string;
  location: string;
  purity: string;
  count: number;
  status: 'Safe' | 'Unsafe' | 'Caution';
}
