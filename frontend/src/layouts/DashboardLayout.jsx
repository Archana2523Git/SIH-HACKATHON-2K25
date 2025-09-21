import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon,
  HomeIcon,
  WifiIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BellIcon,
  UsersIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

// Navigation items for different user roles
const getNavigation = (role) => {
  // Common navigation for all users
  const commonNav = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: HomeIcon, 
      adminOnly: false 
    },
  ];

  // Admin-specific navigation
  const adminNav = [
    { 
      name: 'Admin Dashboard', 
      href: '/admin/dashboard', 
      icon: ChartBarIcon, 
      adminOnly: true 
    },
    { 
      name: 'User Management', 
      href: '/admin/users', 
      icon: UsersIcon, 
      adminOnly: true 
    },
  ];

  // Researcher-specific navigation
  const researcherNav = [
    { 
      name: 'Researcher Dashboard', 
      href: '/researcher/dashboard', 
      icon: ChartBarIcon, 
      adminOnly: false,
      researcherOnly: true
    },
    { 
      name: 'Data Analysis', 
      href: '/researcher/analysis', 
      icon: DocumentTextIcon, 
      adminOnly: false,
      researcherOnly: true
    },
  ];

  // User-specific navigation
  const userNav = [
    { 
      name: 'My Dashboard', 
      href: '/user/dashboard', 
      icon: HomeIcon, 
      adminOnly: false,
      researcherOnly: false
    },
    { 
      name: 'My Reports', 
      href: '/user/reports', 
      icon: DocumentTextIcon, 
      adminOnly: false,
      researcherOnly: false
    },
  ];

  // Return navigation based on user role
  if (role === 'admin') {
    return [...commonNav, ...adminNav, ...researcherNav];
  } else if (role === 'researcher') {
    return [...commonNav, ...researcherNav];
  } else {
    return [...commonNav, ...userNav];
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const navigation = getNavigation(user?.role || 'user');
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.user-menu')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);
  
  // Check if current route matches the navigation item
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  // User dropdown navigation
  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { 
      name: 'Sign out', 
      onClick: () => {
        logout();
        navigate('/login');
      } 
    },
  ];
  
  // Sample data for the dashboard
  const sensorData = [
    { time: '00:00', value: 0.1 },
    { time: '01:00', value: 0.15 },
    { time: '02:00', value: 0.12 },
    { time: '03:00', value: 0.18 },
    { time: '04:00', value: 0.2 },
    { time: '05:00', value: 0.15 },
    { time: '06:00', value: 0.1 },
  ];

  const particleData = [
    { name: 'Plastic', value: 65 },
    { name: 'Organic', value: 25 },
    { name: 'Other', value: 10 },
  ];

  const sizeData = [
    { size: '0-50μm', count: 35 },
    { size: '50-100μm', count: 45 },
    { size: '100-200μm', count: 15 },
    { size: '200-500μm', count: 5 },
  ];

  const alerts = [
    { 
      message: 'High microplastic concentration detected', 
      time: '2m ago',
      severity: 'high'
    },
    { 
      message: 'Sensor calibration needed', 
      time: '1h ago',
      severity: 'medium'
    },
    { 
      message: 'System operating normally', 
      time: '3h ago',
      severity: 'low'
    },
  ];

  const handleNavigation = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-80 flex-1 flex-col bg-white pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center justify-between px-4">
                  <span className="text-xl font-bold text-gray-800">NanoTracers</span>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isActive(item.href)
                            ? 'bg-gray-100 text-gray-900 border-l-4 border-indigo-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-4 py-3 text-sm font-medium rounded-r-md'
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.href);
                          setSidebarOpen(false);
                        }}
                      >
                        <item.icon
                          className={classNames(
                            isActive(item.href) ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex h-16 flex-shrink-0 items-center px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Microplastics Detector</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="mt-2 px-2 space-y-1">
              {navigation.map((item) => {
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
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
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
            
            {/* User profile section at the bottom */}
            <div className="mt-auto p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-700 font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:pl-64">
        <main className="flex-1">
          {/* Top Navigation */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="ml-4 text-xl font-semibold text-gray-900">
                  {navigation.find((item) => isActive(item.href))?.name || 'Dashboard'}
                </h1>
              </div>

              {/* User Profile Dropdown */}
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <button
                    type="button"
                    className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-700 font-medium">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="ml-2 hidden md:inline-block text-sm font-medium text-gray-700">
                      {user?.name || 'User'}
                    </span>
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Profile dropdown panel */}
                  {profileDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      {userNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href || '#'}
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.onClick) {
                              item.onClick();
                            } else if (item.href) {
                              navigate(item.href);
                            }
                            setProfileDropdownOpen(false);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 sm:p-6">
            <div className="mx-auto">
              <div className="space-y-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
