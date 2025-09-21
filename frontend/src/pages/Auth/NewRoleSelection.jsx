import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSignInAlt, FaUserPlus, FaUser, FaMicroscope, FaUserShield, FaChartLine } from 'react-icons/fa';

const roles = [
  { 
    name: 'User', 
    loginPath: '/login/user',
    signupPath: '/signup/user',
    color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    icon: FaUser,
    description: 'Submit samples, view results, and track water quality.'
  },
  { 
    name: 'Researcher/Analyst', 
    loginPath: '/login/researcher',
    signupPath: '/signup/researcher',
    color: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    icon: FaMicroscope,
    description: 'Access advanced analytics, research tools, and generate reports.'
  },
  { 
    name: 'Administrator', 
    loginPath: '/login/admin',
    signupPath: '/signup/admin',
    color: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    icon: FaUserShield,
    description: 'Manage users, system settings, and monitor operations.'
  },
];

export default function RoleSelection() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const modeParam = params.get('mode');
  const isLoginPage = location.pathname.includes('/login') || modeParam === 'login';
  const title = isLoginPage ? 'Login' : 'Create Account';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-12">
      <div className="w-full max-w-6xl px-4">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome to Microplastic Detector</h2>
          <p className="text-gray-600 mb-1">{isLoginPage ? 'Login to your account' : 'Create a new account'}</p>
          <p className="text-sm text-gray-500">Choose your role for a personalized dashboard.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {roles.map((role, index) => (
            <motion.div
              key={role.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.5 
              }}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01, boxShadow: '0 12px 28px -6px rgba(0,0,0,0.12), 0 8px 12px -6px rgba(0,0,0,0.08)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="h-full flex flex-col rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto bg-gradient-to-br ${role.color} text-white shadow-sm`}>
                    {role.icon && <role.icon className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{role.name}</h3>
                  <p className="text-gray-600 text-center mb-6 flex-1">{role.description}</p>
                  
                  <div className="space-y-3 mt-auto">
                    <Link 
                      to={isLoginPage ? role.loginPath : role.signupPath}
                      className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-md bg-gradient-to-r ${role.color} shadow-sm hover:shadow-md transition-all`}
                    >
                      {isLoginPage ? (
                        <>
                          <FaSignInAlt className="mr-2" />
                          Login as {role.name}
                        </>
                      ) : (
                        <>
                          <FaUserPlus className="mr-2" />
                          Sign Up as {role.name}
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Removed bottom prompt per requirement */}
      </div>
    </div>
  );
}
