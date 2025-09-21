import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserShield, FaLock, FaArrowLeft, FaShieldAlt, FaKey } from 'react-icons/fa';
import useNotification from '../../hooks/useNotification';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    twoFactorCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();

  const { username, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (showTwoFactor && !twoFactorCode) {
      newErrors.twoFactorCode = 'Verification code is required';
    } else if (showTwoFactor && !/^\d{6}$/.test(twoFactorCode)) {
      newErrors.twoFactorCode = 'Code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Use AuthContext login for authentication
      const { login } = useAuth();
      const result = await login(formData.username, formData.password, 'admin');
      
      if (result && result.success) {
        // Call the success handler if provided
        if (onLoginSuccess) onLoginSuccess();
        
        // Show success message - navigation is handled by AuthContext
        showSuccess('Login successful! Redirecting...');
      }
    } catch (error) {
      const errorMessage = error.message || 'Authentication failed. Please try again.';
      showError(errorMessage);
      setErrors({
        submit: errorMessage
      });
      setShowTwoFactor(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link to="/role-selection?mode=login" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors">
            <FaArrowLeft className="mr-2" />
            Change Role
          </Link>
          
          <motion.div 
            className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <FaShieldAlt className="h-12 w-12 text-purple-600" />
          </motion.div>
          
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Secure access to system administration
          </p>
        </motion.div>

        <motion.div 
          className="mt-8 bg-white/80 backdrop-blur-sm py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <form key={showTwoFactor ? '2fa' : 'login'} className="space-y-6" onSubmit={handleSubmit}>
              {!showTwoFactor ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Username
                    </label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUserShield className="h-5 w-5 text-purple-500" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border-2 ${errors.username ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-purple-500 focus:border-purple-500'} rounded-xl focus:outline-none transition-all duration-200`}
                        placeholder="Enter admin username"
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center" id="username-error">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-xs text-purple-600 hover:text-purple-500 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-purple-500" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border-2 ${errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-purple-500 focus:border-purple-500'} rounded-xl focus:outline-none transition-all duration-200`}
                        placeholder="Enter your password"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center" id="password-error">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password}
                      </p>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 mb-4 shadow-inner">
                      <FaShieldAlt className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Enter the 6-digit code from your authenticator app
                    </p>
                  </div>
                  <div>
                    <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Code
                    </label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="h-5 w-5 text-purple-500" />
                      </div>
                      <input
                        id="twoFactorCode"
                        name="twoFactorCode"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                        value={twoFactorCode}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-4 text-center text-xl tracking-widest font-mono border-2 ${errors.twoFactorCode ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-purple-500 focus:border-purple-500'} rounded-xl focus:outline-none transition-all duration-200`}
                        placeholder="• • • • • •"
                        maxLength={6}
                      />
                    </div>
                    {errors.twoFactorCode && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center justify-center" id="twoFactorCode-error">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.twoFactorCode}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-center text-gray-500">
                      Having trouble? <button type="button" className="text-purple-600 hover:text-purple-500 font-medium">Resend code</button>
                    </p>
                  </div>
                </motion.div>
              )}

              {errors.submit && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        {errors.submit}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${loading ? 'bg-purple-400' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {showTwoFactor ? 'Verifying...' : 'Signing in...'}
                    </>
                  ) : (
                    showTwoFactor ? 'Verify & Sign In' : 'Continue to 2FA'
                  )}
                </button>
              </motion.div>
            </form>
          </AnimatePresence>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500">
              <p>For security reasons, all login attempts are logged and monitored.</p>
              <p className="mt-1"> 2023 Microplastics Detector. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
