import { Link } from 'react-router-dom';

export default function PageHeader({ title, breadcrumbs = [], actions }) {
  return (
    <div className="mb-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          {breadcrumbs.length > 0 && (
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                {breadcrumbs.map((item, index) => (
                  <li key={item.name}>
                    <div className="flex items-center">
                      {index > 0 && (
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {item.href ? (
                        <Link
                          to={item.href}
                          className={`text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? 'text-gray-500 hover:text-gray-700'
                              : 'text-gray-700 hover:text-gray-900'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-gray-500">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
        {actions && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
