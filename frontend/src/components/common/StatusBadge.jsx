import React from 'react';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiClock, 
  FiXCircle,
  FiAlertTriangle
} from 'react-icons/fi';

const statusConfig = {
  // Status types for system/component status
  online: {
    icon: <FiCheckCircle className="h-4 w-4" />,
    color: 'bg-green-100 text-green-800',
    text: 'Online'
  },
  offline: {
    icon: <FiXCircle className="h-4 w-4" />,
    color: 'bg-gray-100 text-gray-800',
    text: 'Offline'
  },
  warning: {
    icon: <FiAlertTriangle className="h-4 w-4" />,
    color: 'bg-yellow-100 text-yellow-800',
    text: 'Warning'
  },
  error: {
    icon: <FiAlertCircle className="h-4 w-4" />,
    color: 'bg-red-100 text-red-800',
    text: 'Error'
  },
  
  // Status types for alerts/notifications
  active: {
    icon: <FiCheckCircle className="h-4 w-4" />,
    color: 'bg-green-100 text-green-800',
    text: 'Active'
  },
  pending: {
    icon: <FiClock className="h-4 w-4" />,
    color: 'bg-yellow-100 text-yellow-800',
    text: 'Pending'
  },
  resolved: {
    icon: <FiCheckCircle className="h-4 w-4" />,
    color: 'bg-blue-100 text-blue-800',
    text: 'Resolved'
  },
  critical: {
    icon: <FiAlertTriangle className="h-4 w-4" />,
    color: 'bg-red-100 text-red-800',
    text: 'Critical'
  },
  
  // Default fallback
  default: {
    icon: <FiCircle className="h-4 w-4" />,
    color: 'bg-gray-100 text-gray-800',
    text: 'Unknown'
  }
};

const StatusBadge = ({ 
  status = 'default', 
  showIcon = true, 
  showText = true,
  className = '',
  customText
}) => {
  const config = statusConfig[status.toLowerCase()] || statusConfig.default;
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {showIcon && <span className="mr-1.5">{config.icon}</span>}
      {showText && (customText || config.text)}
    </span>
  );
};

export default StatusBadge;
