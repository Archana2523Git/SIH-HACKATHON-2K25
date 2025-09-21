import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const DashboardPage = ({ 
  title, 
  subtitle, 
  children, 
  className = '',
  headerActions,
  fullWidth = false,
  noPadding = false,
}) => {
  return (
    <div className={classNames("space-y-6", className)}>
      {/* Page header */}
      {(title || headerActions) && (
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && (
            <div className="mt-4 flex md:mt-0 md:ml-4">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Page content */}
      <div 
        className={classNames(
          !noPadding && 'bg-white shadow rounded-lg',
          fullWidth ? 'w-full' : 'max-w-7xl',
          className
        )}
      >
        {!noPadding ? (
          <div className="px-4 py-5 sm:p-6">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

DashboardPage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerActions: PropTypes.node,
  fullWidth: PropTypes.bool,
  noPadding: PropTypes.bool,
};

export default DashboardPage;
