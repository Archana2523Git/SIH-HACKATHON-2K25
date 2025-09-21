import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/20/solid';
import { classNames } from '../../utils/helpers';

const SortableHeader = ({ column, sortConfig, onSort, className = '' }) => {
  const isSorted = sortConfig.key === column.key;
  const isAscending = isSorted && sortConfig.direction === 'asc';
  
  return (
    <th
      scope="col"
      className={classNames(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap',
        column.sortable ? 'cursor-pointer select-none' : '',
        className
      )}
      onClick={column.sortable ? () => onSort(column.key) : undefined}
    >
      <div className="flex items-center justify-between">
        {column.header}
        {column.sortable && (
          <span className="ml-2">
            {isSorted ? (
              isAscending ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )
            ) : (
              <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
            )}
          </span>
        )}
      </div>
    </th>
  );
};

const TableRow = ({ columns, row, rowIndex, onRowClick, rowClassName, getRowProps }) => {
  const rowProps = getRowProps ? getRowProps(row) : {};
  
  return (
    <tr
      className={classNames(
        onRowClick ? 'cursor-pointer hover:bg-gray-50' : '',
        rowClassName
      )}
      onClick={() => onRowClick && onRowClick(row)}
      {...rowProps}
    >
      {columns.map((column, colIndex) => (
        <td
          key={`${rowIndex}-${column.key}`}
          className={classNames(
            'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
            column.cellClassName || ''
          )}
        >
          {column.render ? column.render(row, rowIndex) : row[column.key]}
        </td>
      ))}
    </tr>
  );
};

export default function DashboardTable({
  columns,
  data,
  defaultSort = { key: '', direction: 'asc' },
  searchable = false,
  searchPlaceholder = 'Search...',
  onRowClick,
  className = '',
  emptyState = 'No data available',
  loading = false,
  loadingText = 'Loading...',
  rowClassName = '',
  getRowProps,
  onSearch,
}) {
  const [sortConfig, setSortConfig] = useState(defaultSort);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];
    
    // Apply search
    if (searchTerm && onSearch) {
      result = onSearch(result, searchTerm);
    } else if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) =>
        columns.some((column) => {
          const value = item[column.key];
          return (
            value &&
            String(value).toLowerCase().includes(term)
          );
        })
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, sortConfig, searchTerm, columns, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      {/* Search and filters */}
      {searchable && (
        <div className="mb-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
                      <SortableHeader
                        key={column.key}
                        column={column}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        className={column.headerClassName}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                        {loadingText}
                      </td>
                    </tr>
                  ) : filteredAndSortedData.length > 0 ? (
                    filteredAndSortedData.map((row, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        columns={columns}
                        row={row}
                        rowIndex={rowIndex}
                        onRowClick={onRowClick}
                        rowClassName={rowClassName}
                        getRowProps={getRowProps}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                        {emptyState}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
      render: PropTypes.func,
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string,
      headerClassName: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
  emptyState: PropTypes.node,
  loading: PropTypes.bool,
  loadingText: PropTypes.node,
  rowClassName: PropTypes.string,
  getRowProps: PropTypes.func,
  onSearch: PropTypes.func,
};

DashboardTable.defaultProps = {
  defaultSort: { key: '', direction: 'asc' },
  searchable: false,
  searchPlaceholder: 'Search...',
  emptyState: 'No data available',
  loading: false,
  loadingText: 'Loading...',
  rowClassName: '',
};
