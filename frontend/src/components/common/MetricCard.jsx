import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

const MetricCard = ({
  title,
  value,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
  trend,
  trendValue,
  trendLabel,
  description,
  className = ''
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') {
      return <FiTrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === 'down') {
      return <FiTrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <FiMinus className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${iconBgColor} ${iconColor} mr-4`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <div className="ml-2 flex items-center">
                {getTrendIcon()}
                <span 
                  className={`ml-1 text-xs font-medium ${
                    trend === 'up' ? 'text-green-600' : 
                    trend === 'down' ? 'text-red-600' : 
                    'text-gray-500'
                  }`}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {trendLabel && (
            <p className="mt-1 text-xs text-gray-500">{trendLabel}</p>
          )}
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
