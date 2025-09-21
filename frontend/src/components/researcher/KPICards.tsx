import React from 'react';
import { FiActivity, FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi';
import MetricCard from '../common/MetricCard';
import { WaterQualityData } from '../../types/researcher';

interface KPICardsProps {
  data: WaterQualityData;
  isLoading: boolean;
}

export const KPICards: React.FC<KPICardsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Samples"
        value={data.overview.totalSamples.toLocaleString()}
        icon={FiActivity}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        trend="up"
        trendValue="+2.1%"
        trendLabel="vs last 7d"
      />
      <MetricCard
        title="Critical Issues"
        value={data.overview.criticalIssues.toString()}
        icon={FiAlertTriangle}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        trend="down"
        trendValue="-0.4%"
        trendLabel="vs last 7d"
      />
      <MetricCard
        title="Avg. Quality Score"
        value={`${data.overview.avgQualityScore}/100`}
        icon={FiCheckCircle}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        trend="up"
        trendValue="+1.3%"
        trendLabel="vs last 7d"
      />
      <MetricCard
        title="Last Updated"
        value={data.overview.lastUpdated}
        icon={FiClock}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
};
