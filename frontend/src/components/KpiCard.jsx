import React from "react";
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

const KpiCard = ({ 
  title, 
  value, 
  unit, 
  color = 'blue', 
  icon,
  trend,
  trendValue,
  trendLabel,
  loading = false
}) => {
  const colors = {
    blue: {
      bg: 'from-blue-50 to-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-blue-600'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-purple-600'
    },
    green: {
      bg: 'from-green-50 to-green-100',
      text: 'text-green-700',
      border: 'border-green-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-green-600'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100',
      text: 'text-orange-700',
      border: 'border-orange-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600',
      trendNeutral: 'text-orange-600'
    },
  };

  const selectedColor = colors[color] || colors.blue;
  
  const renderTrend = () => {
    if (!trend && trend !== 0) return null;
    
    const isPositive = trend > 0;
    const isNeutral = trend === 0;
    
    return (
      <div className={`flex items-center text-sm mt-1 ${isPositive ? selectedColor.trendUp : isNeutral ? selectedColor.trendNeutral : selectedColor.trendDown}`}>
        {isPositive ? (
          <FiTrendingUp className="mr-1" />
        ) : isNeutral ? (
          <FiMinus className="mr-1" />
        ) : (
          <FiTrendingDown className="mr-1" />
        )}
        <span>
          {Math.abs(trend)}% {trendLabel || (isPositive ? 'increase' : isNeutral ? 'no change' : 'decrease')}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col p-5 rounded-xl border shadow-sm 
      bg-gradient-to-br ${selectedColor.bg} ${selectedColor.text} ${selectedColor.border}
      transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full`}
    >
      <div className="flex justify-between items-start w-full">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <div className="flex items-end mt-1">
            <p className="text-2xl font-bold">
              {loading ? '--' : value} {unit && <span className="text-sm font-normal opacity-80">{unit}</span>}
            </p>
          </div>
          {trendValue && (
            <div className="text-xs mt-1 opacity-70">
              vs. {trendValue} (prev)
            </div>
          )}
          {renderTrend()}
        </div>
        {icon && <div className="text-3xl opacity-80">{icon}</div>}
      </div>
    </div>
  );
};

export default KpiCard;
