import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

export default function StatsCard({ title, value, change, changeType = 'increase', icon: Icon }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change && (
        <div className={`px-5 py-3 ${changeType === 'increase' ? 'bg-green-50' : 'bg-red-50'} sm:px-6`}>
          <div className="text-sm">
            <span className={`font-medium ${changeType === 'increase' ? 'text-green-800' : 'text-red-800'} flex items-center`}>
              {changeType === 'increase' ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" aria-hidden="true" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" aria-hidden="true" />
              )}
              {change}% from last month
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
