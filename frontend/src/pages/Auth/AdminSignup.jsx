import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaUserShield, FaArrowLeft, FaUser, FaEnvelope, FaIdBadge, FaBuilding, FaKey, FaLock } from 'react-icons/fa';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminId: '',
    organization: '',
    adminCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    if (name === 'password') {
      let score = 0;
      if (value.length >= 10) score += 1;
      if (/[A-Z]/.test(value)) score += 1;
      if (/[0-9]/.test(value)) score += 1;
      if (/[^A-Za-z0-9]/.test(value)) score += 1;
      setPasswordStrength(score);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 10) { // Stronger password for admin
      newErrors.password = 'Password must be at least 10 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.adminId.trim()) {
      newErrors.adminId = 'Admin ID is required';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }
    
    // Admin code validation (this would be a secret code for admin registration)
    if (formData.adminCode !== 'ADMIN2023') { // In production, this should be more secure
      newErrors.adminCode = 'Invalid admin registration code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        ...formData,
        role: 'admin'
      };
      
      const result = await signup(userData);
      
      if (result.success) {
        toast.success('Admin account created successfully!');
        navigate('/dashboard/admin');
      }
    } catch (error) {
      console.error('Admin signup failed:', error);
      toast.error(error.message || 'Failed to create admin account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100">
            <FaUserShield className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Admin Account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="adminId" className="sr-only">Admin ID</label>
              <div className="relative">
                <FaIdBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="adminId"
                  name="adminId"
                  type="text"
                  required
                  className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.adminId ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Admin ID"
                  value={formData.adminId}
                  onChange={handleChange}
                />
              </div>
              {errors.adminId && (
                <p className="mt-1 text-sm text-red-600">{errors.adminId}</p>
              )}
            </div>

            <div>
              <label htmlFor="organization" className="sr-only">Organization</label>
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  id="organization"
                  name="organization"
                  required
                  className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.organization ? 'border-red-300' : 'border-gray-300'
                  } text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  value={formData.organization}
                  onChange={handleChange}
                >
                  <option value="">Select Organization</option>
                  <option value="City Water Authority">City Water Authority</option>
                  <option value="University Lab">University Lab</option>
                  <option value="Environmental NGO">Environmental NGO</option>
                </select>
              </div>
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
              )}
            </div>

            <div>
              <label htmlFor="adminCode" className="sr-only">Admin Registration Code</label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="adminCode"
                  name="adminCode"
                  type="password"
                  required
                  className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.adminCode ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Admin Registration Code"
                  value={formData.adminCode}
                  onChange={handleChange}
                />
              </div>
              {errors.adminCode && (
                <p className="mt-1 text-sm text-red-600">{errors.adminCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Password (min 10 characters)"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 h-1.5 w-full bg-gray-200 rounded">
                <div
                  className={`h-1.5 rounded ${
                    passwordStrength <= 1 ? 'bg-red-500 w-1/4' : passwordStrength === 2 ? 'bg-yellow-500 w-2/4' : passwordStrength === 3 ? 'bg-blue-500 w-3/4' : 'bg-green-600 w-full'
                  } transition-all`}
                ></div>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <Link 
            to="/role-selection" 
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" />
            Back to Role Selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
