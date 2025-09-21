import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure auth state is properly initialized
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show loading state while checking authentication
  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Store the intended destination before redirecting to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has any of the allowed roles
  const hasRequiredRole = allowedRoles.length === 0 || 
                         (user && allowedRoles.includes(user.role));

  // Redirect to unauthorized if user doesn't have required role
  if (!hasRequiredRole) {
    // Only show the error toast once
    useEffect(() => {
      toast.error('You do not have permission to access this page');
      // Redirect to dashboard based on user role after showing the error
      const timer = setTimeout(() => {
        if (user?.role === 'admin') {
          navigate('/dashboard/admin', { replace: true });
        } else if (user?.role === 'researcher') {
          navigate('/dashboard/researcher', { replace: true });
        } else {
          navigate('/dashboard/user', { replace: true });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl font-semibold mb-4">Access Denied</div>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
