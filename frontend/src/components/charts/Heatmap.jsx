import React from 'react';

const Heatmap = ({ title = 'Hotspot Heatmap', className = '' }) => {
  return (
    <div className={`h-64 border rounded bg-gray-50 flex items-center justify-center text-gray-500 ${className}`}>
      {title} — Map Placeholder
    </div>
  );
};

export default Heatmap;
