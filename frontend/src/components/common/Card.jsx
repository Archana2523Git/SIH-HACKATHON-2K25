import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  headerAction,
  noPadding = false,
  hoverEffect = false
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow overflow-hidden ${hoverEffect ? 'transition-shadow duration-200 hover:shadow-md' : ''} ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

export default Card;
