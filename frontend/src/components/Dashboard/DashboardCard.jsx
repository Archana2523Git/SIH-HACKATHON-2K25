import PropTypes from 'prop-types';
import { classNames } from '../../utils/helpers';

const DashboardCard = ({
  title,
  subtitle,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
  footer,
  noPadding = false,
  noShadow = false,
  noBorder = false,
  noBackground = false,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        'rounded-xl overflow-hidden transition-all duration-200',
        !noBackground && 'bg-white',
        !noBorder && 'border border-gray-100',
        !noShadow && 'shadow-sm hover:shadow-md',
        onClick && 'cursor-pointer hover:-translate-y-0.5',
        'transform transition-all duration-200 ease-in-out',
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {(title || subtitle) && (
        <div className={classNames(
          'px-4 py-3 sm:px-5 border-b border-gray-100',
          headerClassName
        )}>
          {title && (
            <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={classNames(
        !noPadding && 'p-3 sm:p-4',
        'transition-all duration-200',
        contentClassName
      )}>
        {children}
      </div>
      
      {footer && (
        <div className="px-3 py-2 sm:px-4 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  footer: PropTypes.node,
  noPadding: PropTypes.bool,
  noShadow: PropTypes.bool,
  noBorder: PropTypes.bool,
  noBackground: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DashboardCard;
