// Application constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const DEFAULT_POLLING_INTERVAL = 30000; // 30 seconds
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Chart colors
export const CHART_COLORS = {
  primary: 'rgba(59, 130, 246, 0.8)',
  secondary: 'rgba(16, 185, 129, 0.8)',
  warning: 'rgba(234, 179, 8, 0.8)',
  danger: 'rgba(239, 68, 68, 0.8)',
  info: 'rgba(139, 92, 246, 0.8)',
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  RESEARCHER: 'researcher',
  USER: 'user',
} as const;

// Status types
export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Time ranges
export const TIME_RANGES = {
  HOUR_1: '1h',
  HOUR_24: '24h',
  DAY_7: '7d',
  DAY_30: '30d',
  DAY_90: '90d',
} as const;

// Parameter units
export const PARAMETER_UNITS = {
  PH: 'pH',
  TURBIDITY: 'NTU',
  CHLORINE: 'mg/L',
  TEMPERATURE: '°C',
  TDS: 'mg/L',
  MICROPLASTICS: 'particles/L',
} as const;

// Severity levels
export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;
