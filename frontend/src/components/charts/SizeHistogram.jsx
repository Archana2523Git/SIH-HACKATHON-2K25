import React from 'react';

const SizeHistogram = ({ title = 'Particle Size Histogram', className = '' }) => {
  return (
    <div className={`h-64 border rounded bg-gray-50 flex items-center justify-center text-gray-500 ${className}`}>
      {title} — Chart Placeholder
    </div>
  );
};

export default SizeHistogram;
