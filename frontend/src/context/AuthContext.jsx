import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardPath = (role) => {
    switch ((role || '').toLowerCase()) {
      case 'admin':
        return '/dashboard/admin';
      case 'researcher':
      case 'analyst':
      case 'staff':
        return '/dashboard/researcher';
      case 'user':
      case 'student':
      default:
        return '/dashboard/user';
    }
  };

  // Check for existing session on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          // Normalize legacy roles
          const normalizedRole = parsed.role === 'analyst' || parsed.role === 'staff'
            ? 'researcher'
            : parsed.role === 'student'
            ? 'user'
            : parsed.role;
          const normalizedUser = { ...parsed, role: normalizedRole };
          setUser(normalizedUser);
          // Persist normalization so future loads are consistent
          localStorage.setItem('user', JSON.stringify(normalizedUser));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // Placeholder Google OAuth login (component scope)
  const loginWithGoogle = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        toast.error('Google Login not configured. Please set VITE_GOOGLE_CLIENT_ID');
        return { success: false };
      }
      // Demo-only: simulate Google login success and assign a role
      const simulatedUser = {
        id: 'g-1',
        email: 'demo.googleuser@example.com',
        role: 'user',
        name: 'Google User'
      };
      const simulatedToken = 'mock-google-token';
      setUser(simulatedUser);
      setToken(simulatedToken);
      localStorage.setItem('token', simulatedToken);
      localStorage.setItem('user', JSON.stringify(simulatedUser));
      const redirectPath = getDashboardPath(simulatedUser.role);
      navigate(redirectPath, { replace: true });
      toast.success('Logged in with Google');
      return { success: true };
    } catch (error) {
      console.error('Google login failed:', error);
      toast.error('Google login failed');
      return { success: false, error };
    }
  };

  const login = async (email, password, role) => {
    try {
      // This is a mock implementation - replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Use the provided role if available, otherwise try to determine from email
          let userRole = role;
          if (!userRole) {
            userRole = email.includes('admin') ? 'admin' :
                      (email.includes('analyst') || email.includes('staff') || email.includes('research')) ? 'researcher' :
                      (email.includes('user') || email.includes('monitor')) ? 'user' : 'user';
          }
          
          resolve({
            data: {
              user: { 
                id: '1', 
                email, 
                role: userRole, 
                name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') 
              },
              token: 'mock-jwt-token',
            },
          });
        }, 1000);
      });

      const { user: userData, token: authToken } = response.data;
      
      // Update state and storage
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // Get the appropriate dashboard path based on user role
      const redirectPath = getDashboardPath(userData.role);
      
      // Use a small timeout to ensure state updates before navigation
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 100);
      
      return { 
        success: true,
        user: userData,
        redirectTo: redirectPath
      };
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      return { success: false, error };
    }
  };

  const signup = async (userData) => {
    try {
      // This is a mock implementation - replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Map role to proper role name
          const userRole = userData.role === 'staff' ? 'researcher' :
                           userData.role === 'student' ? 'user' : userData.role;
          
          resolve({
            data: {
              user: { 
                id: '1', 
                email: userData.email, 
                role: userRole, 
                name: `${userData.firstName} ${userData.lastName}`,
                ...(userRole === 'analyst' && {
                  staffId: userData.staffId,
                  department: userData.department,
                  position: userData.position
                })
              },
              token: 'mock-jwt-token',
            },
          });
        }, 1000);
      });

      const { user: newUser, token: authToken } = response.data;
      
      setUser(newUser);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Redirect immediately to dashboard per simplified flow
      const redirectPath = getDashboardPath(newUser.role);
      toast.success('Account created successfully!');
      navigate(redirectPath, { replace: true });
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
      return { success: false, error };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isResearcher: user?.role === 'researcher',
    isUser: user?.role === 'user',
    // Backward-compat flags (deprecated)
    isStaff: user?.role === 'staff',
    isStudent: user?.role === 'student',
    login,
    signup,
    logout,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
