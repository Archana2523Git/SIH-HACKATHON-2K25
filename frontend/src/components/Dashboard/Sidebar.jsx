import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Sensor Data', href: '/dashboard/sensor-data', icon: WifiIcon },
  { name: 'ML Analysis', href: '/dashboard/analysis', icon: ChartBarIcon },
  { name: 'Alerts', href: '/dashboard/alerts', icon: BellIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();
  const location = useLocation();
  
  // Check if current route matches the navigation item
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };
  
  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => {
    if (item.adminOnly && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-64 lg:flex-col border-r border-gray-200 bg-white">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-16 flex-shrink-0 items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Microplastics Detector</h1>
        </div>
        <div className="flex flex-col overflow-y-auto">
          <nav className="mt-2 px-2 space-y-1">
            {filteredNavigation.map((item) => {
              const isItemActive = isActive(item.href);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={classNames(
                    isItemActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    'group flex items-center px-4 py-3 text-sm font-medium rounded-r-md transition-colors duration-200'
                  )}
                  aria-current={isItemActive ? 'page' : undefined}
                >
                  <Icon
                    className={classNames(
                      isItemActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.name === 'Alerts' && (
                    <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-red-500 text-white">
                      3
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}