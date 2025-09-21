import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Features from './pages/Features';
import RoleSelection from './pages/Auth/NewRoleSelection';
import UserLogin from './pages/Auth/UserLogin';
import AdminLogin from './pages/Auth/AdminLogin';
import ResearcherLogin from './pages/Auth/ResearcherLogin';
import UserSignup from './pages/Auth/UserSignup';
import ResearcherSignup from './pages/Auth/ResearcherSignup';
import AdminSignup from './pages/Auth/AdminSignup';
import Notification from './components/common/Notification';
import Unauthorized from './pages/Errors/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import ErrorBoundary from './components/ErrorBoundary';
import UserDashboard from './pages/Dashboard/UserDashboard';
import ResearcherDashboard from './pages/Dashboard/ResearcherDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

function App() {
  const { user } = useAuth();

  // Success alert function is now handled by useNotification hook

  return (
    <div className="flex flex-col min-h-screen">
      <Notification />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/features" element={<Features />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <DashboardLayout />
              </ErrorBoundary>
            </ProtectedRoute>
          }>
            {/* Redirect to role-specific dashboard */}
            <Route index element={
              <ProtectedRoute>
                {() => {
                  const { user } = useAuth();
                  if (user?.role === 'admin') return <Navigate to="/dashboard/admin" replace />;
                  if (user?.role === 'researcher') return <Navigate to="/dashboard/researcher" replace />;
                  return <Navigate to="/dashboard/user" replace />;
                }}
              </ProtectedRoute>
            } />
            
            {/* Role-scoped dashboards */}
            <Route path="user" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="researcher" element={
              <ProtectedRoute allowedRoles={['researcher', 'analyst']}>
                <ResearcherDashboard />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Navigate to="/role-selection?mode=login" replace state={{ from: useLocation().state?.from }} />} />
          <Route path="/signup" element={<Navigate to="/role-selection" replace state={{ from: useLocation().state?.from }} />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/select-role" element={<Navigate to="/role-selection" replace />} />

          {/* Login Routes */}
          <Route path="/login/user" element={<UserLogin onLoginSuccess={() => showSuccessAlert('Login successful!')} />} />
          <Route path="/login/admin" element={<AdminLogin onLoginSuccess={() => showSuccessAlert('Login successful!')} />} />
          <Route path="/login/researcher" element={<ResearcherLogin onLoginSuccess={() => showSuccessAlert('Researcher login successful!')} />} />

          {/* Signup Routes */}
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/researcher" element={<ResearcherSignup />} />
          <Route path="/signup/admin" element={<AdminSignup />} />

          {/* Legacy redirects */}
          <Route path="/login/analyst" element={<Navigate to="/login/researcher" replace />} />
          <Route path="/signup/analyst" element={<Navigate to="/signup/researcher" replace />} />
          <Route path="/dashboard/analyst" element={<Navigate to="/dashboard/researcher" replace />} />
          <Route path="/analyst/*" element={<Navigate to="/dashboard/researcher" replace />} />
          <Route path="/user/quality" element={<div>Water Quality Monitoring</div>} />
          <Route path="/user/reports" element={<div>My Reports</div>} />
          <Route path="/user/alerts" element={<div>My Alerts</div>} />
          <Route path="/admin/overview" element={<div>System Overview</div>} />
          <Route path="/admin/users" element={<div>User Management</div>} />
          <Route path="/admin/locations" element={<div>Location Management</div>} />
          <Route path="/admin/settings" element={<div>System Settings</div>} />

          {/* Fallback Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
