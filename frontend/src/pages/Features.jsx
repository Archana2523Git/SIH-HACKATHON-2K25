import React from 'react';
import { FaMicroscope, FaChartLine, FaUserShield, FaFlask, FaDatabase, FaFileAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaMicroscope className="h-12 w-12 text-blue-600" />,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning models for accurate identification and classification of microplastics in water samples.'
    },
    {
      icon: <FaChartLine className="h-12 w-12 text-green-600" />,
      title: 'Real-time Analysis',
      description: 'Get instant results with our high-speed processing of water sample images.'
    },
    {
      icon: <FaUserShield className="h-12 w-12 text-purple-600" />,
      title: 'Role-Based Access',
      description: 'Secure system with different access levels for users, analysts, and administrators.'
    },
    {
      icon: <FaFlask className="h-12 w-12 text-yellow-600" />,
      title: 'Lab Integration',
      description: 'Seamlessly connect with laboratory equipment for automated data collection.'
    },
    {
      icon: <FaDatabase className="h-12 w-12 text-red-600" />,
      title: 'Data Management',
      description: 'Store, organize, and analyze all your microplastic research data in one place.'
    },
    {
      icon: <FaFileAlt className="h-12 w-12 text-indigo-600" />,
      title: 'Report Generation',
      description: 'Automatically generate comprehensive reports with visualizations of your findings.'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Advanced Microplastic Detection
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Comprehensive tools for accurate microplastic detection, analysis, and reporting
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-20 w-20 rounded-md bg-white shadow-md mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
