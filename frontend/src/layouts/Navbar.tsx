import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaMicroscope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // Navigation items for unauthenticated users
  const publicNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  // Navigation items for authenticated users
  const getAuthenticatedNavigation = (role: string) => {
    const baseNav = [
      { name: 'Dashboard', href: `/dashboard/${role}` },
    ];

    if (role === 'user') {
      return [
        ...baseNav,
        { name: 'My Water Quality', href: '/user/quality' },
        { name: 'Reports', href: '/user/reports' },
        { name: 'Alerts', href: '/user/alerts' },
      ];
    }

    if (role === 'researcher') {
      return [
        ...baseNav,
        { name: 'Researcher Dashboard', href: '/dashboard/researcher' },
        { name: 'Reports', href: '/dashboard/researcher' },
        { name: 'Alerts', href: '/dashboard/researcher' },
      ];
    }

    if (role === 'admin') {
      return [
        ...baseNav,
        { name: 'System Overview', href: '/admin/overview' },
        { name: 'User Management', href: '/admin/users' },
        { name: 'Locations', href: '/admin/locations' },
        { name: 'Settings', href: '/admin/settings' },
      ];
    }

    return baseNav;
  };

  // On landing page, always show public nav to avoid Dashboard button on hero
  const onLanding = currentPath === '/';
  const navigation = onLanding ? publicNavigation : (isAuthenticated && user ? getAuthenticatedNavigation(user.role) : publicNavigation);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="flex items-center space-x-2">
                    <FaMicroscope className="h-7 w-7 text-indigo-600" />
                    <span className="text-xl font-bold text-gray-900">Microplastic Detector</span>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        currentPath === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={currentPath === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                {!isAuthenticated ? (
                  <div className="flex space-x-3">
                    <Link
                      to="/role-selection?mode=login"
                      className={classNames(
                        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                        currentPath.startsWith('/role-selection') && window.location.search.includes('mode=login') ? 'bg-blue-700' : ''
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      to="/role-selection"
                      className={classNames(
                        'inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                        currentPath === '/role-selection' ? 'bg-gray-100' : ''
                      )}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span className="sr-only">Open user menu</span>
                        <div
                          className={classNames(
                            'h-8 w-8 rounded-full flex items-center justify-center text-white font-medium',
                            user?.role === 'admin' ? 'bg-purple-600' :
                            user?.role === 'researcher' ? 'bg-green-600' : 'bg-blue-600'
                          )}
                        >
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            user?.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user?.role === 'researcher' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user?.role?.toUpperCase() || 'USER'}
                          </span>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/dashboard/${user?.role}`}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 flex items-center'
                              )}
                            >
                              <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                              </svg>
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 flex items-center'
                              )}
                            >
                              <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                              </svg>
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <div className="border-t border-gray-100 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center'
                              )}
                            >
                              <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                              </svg>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                {!isAuthenticated && (
                  <div className="flex space-x-3 mr-2">
                    <Link
                      to="/role-selection?mode=login"
                      className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Login
                    </Link>
                    <Link
                      to="/role-selection"
                      className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    currentPath === item.href
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {isAuthenticated && (
                <Disclosure.Button
                  as="button"
                  onClick={handleLogout}
                  className="w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
