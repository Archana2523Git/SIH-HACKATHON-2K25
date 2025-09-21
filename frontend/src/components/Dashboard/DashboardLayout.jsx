import { useState, useMemo } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/20/solid';
import Sidebar from './Sidebar';
import Header from './Header';

// Generate breadcrumbs based on the current route
const generateBreadcrumbs = (pathname) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  return pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = segment.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
    
    return {
      name,
      href: index < pathSegments.length - 1 ? href : undefined,
    };
  });
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const breadcrumbs = useMemo(() => {
    const items = generateBreadcrumbs(location.pathname);
    // Add home as the first breadcrumb
    return [{ name: 'Dashboard', href: '/dashboard' }, ...items];
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {/* Mobile sidebar overlay */}
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
        
        {/* Mobile sidebar panel */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <div>
                      <Link to="/dashboard" className="text-gray-400 hover:text-gray-500">
                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                      </Link>
                    </div>
                  </li>
                  {breadcrumbs.map((item, index) => (
                    <li key={item.name}>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        {item.href ? (
                          <Link
                            to={item.href}
                            className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {item.name}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
              
              {/* Page content */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NanoTracers. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
