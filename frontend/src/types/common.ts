export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  renderCell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T, index: number) => void;
  searchable?: boolean;
  onExport?: (data: T[]) => void;
  loading?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    fill?: boolean;
  }>;
}

export interface ChartProps {
  type: 'line' | 'bar';
  data: ChartData;
  title: string;
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

export interface WaterQualityFilter {
  timeRange: string;
  parameters: string[];
  location: string;
}

export interface WaterQualityData {
  id: number;
  timestamp: string;
  location: string;
  parameter: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface Report {
  id: number;
  name: string;
  type: string;
  dateGenerated: string;
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
}

export interface ReportGeneratorProps {
  onGenerate: (reportData: ReportFormData) => void;
  onCancel: () => void;
}

export interface ReportFormData {
  reportName: string;
  reportType: string;
  dateRange: {
    start: string;
    end: string;
  };
  parameters: string[];
}

export interface Alert {
  id: number;
  timestamp: string;
  location: string;
  parameter: string;
  value: number;
  unit: string;
  status: 'active' | 'resolved' | 'investigating';
  severity: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
}

export interface AlertDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertData: Alert | null;
  onUpdateStatus: (alertId: number, status: Alert['status'], notes?: string) => void;
}
