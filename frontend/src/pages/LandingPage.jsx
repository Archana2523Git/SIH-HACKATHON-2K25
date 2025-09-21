import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicroscope, FaSearch, FaChartLine, FaFlask, FaWater, FaUserShield, FaMicrochip } from 'react-icons/fa';
import { useState } from 'react';

const features = [
  {
    name: 'Microscopic Analysis',
    description: 'High-precision detection of microplastics using advanced microscopy techniques and image processing.',
    icon: FaMicroscope,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    name: 'Particle Identification',
    description: 'Accurate identification and classification of microplastic particles by size, shape, and composition.',
    icon: FaSearch,
    color: 'bg-green-50 text-green-600'
  },
  {
    name: 'Sample Management',
    description: 'Organize and track water samples with detailed metadata and analysis history.',
    icon: FaFlask,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    name: 'Data Visualization',
    description: 'Interactive charts and graphs to visualize microplastic concentration and distribution patterns.',
    icon: FaChartLine,
    color: 'bg-amber-50 text-amber-600'
  },
  {
    name: 'Water Quality Assessment',
    description: 'Comprehensive analysis of water samples to assess microplastic contamination levels.',
    icon: FaWater,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    name: 'Secure Data Storage',
    description: 'Enterprise-grade security to protect your research data and analysis results.',
    icon: FaUserShield,
    color: 'bg-indigo-50 text-indigo-600'
  }
];

const researchApplications = [
  {
    name: 'Environmental Research',
    description: 'Study microplastic pollution in various water bodies and track changes over time.'
  },
  {
    name: 'Water Treatment',
    description: 'Monitor microplastic removal efficiency in water treatment facilities.'
  },
  {
    name: 'Marine Biology',
    description: 'Research the impact of microplastics on marine ecosystems and organisms.'
  },
  {
    name: 'Public Health',
    description: 'Investigate potential health risks associated with microplastic contamination in drinking water.'
  }
];

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Environmental Science Professor',
    content: 'This platform has revolutionized how we track and analyze microplastics in our water samples. The AI detection is remarkably accurate.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Michael Johnson',
    role: 'Research Assistant',
    content: 'The real-time analysis feature has cut our lab processing time in half. Highly recommended for any environmental research team.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Priya Patel',
    role: 'Graduate Student',
    content: 'As a student researcher, I appreciate how quickly I can get results and share them with my team.',
    image: 'https://randomuser.me/api/portraits/women/63.jpg'
  }
];

function LandingPage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                >
                  <span className="block">Advanced</span>
                  <span className="block text-blue-200">Microplastic Detection</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Real-time identification of microplastics in water with AI-driven imaging and sensor technology.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-md shadow"
                  >
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 sm:mt-0 sm:ml-3"
                  >
                    <Link
                      to="/features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </main>
          </div>
        </div>
        {/* Watermark & Decorative Icons */}
        <div className="absolute -left-24 -top-24 opacity-10 pointer-events-none hidden lg:block">
          <FaFlask className="w-[400px] h-[400px] text-white" />
        </div>
        <div className="absolute right-8 top-8 opacity-20 pointer-events-none hidden lg:block">
          <FaMicroscope className="w-24 h-24 text-white" />
        </div>
        <div className="absolute right-24 top-40 opacity-20 pointer-events-none hidden lg:block">
          <FaWater className="w-16 h-16 text-white" />
        </div>
        <div className="absolute right-10 top-56 opacity-20 pointer-events-none hidden lg:block">
          <FaMicrochip className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Advanced Microplastic Analysis Tools
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our comprehensive platform provides cutting-edge tools for microplastic detection and analysis in water samples.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative p-7 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-50"
                >
                  <div className={`${feature.color} p-4 rounded-2xl inline-flex items-center justify-center shadow-sm`}> 
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Research Applications */}
      <div className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-14">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Applications</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Research & Analysis
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform supports a wide range of research applications in environmental science and beyond.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {researchApplications.map((app, index) => (
              <motion.div 
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white p-7 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-medium text-gray-900">{app.name}</h3>
                <p className="mt-2 text-gray-600">{app.description}</p>
                <p className="mt-2 text-sm italic text-gray-500">
                  {app.name === 'Environmental Research' && 'Track pollution trends in water bodies.'}
                  {app.name === 'Water Treatment' && 'Monitor removal efficiency and process stability.'}
                  {app.name === 'Marine Biology' && 'Study ecosystem impact and species exposure.'}
                  {app.name === 'Public Health' && 'Assess potential risks in drinking water.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials (Carousel) */}
      <div className="py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-14">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Researchers Are Saying
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center">
                <img 
                  className="h-12 w-12 rounded-full" 
                  src={testimonials[testimonialIndex].image} 
                  alt={testimonials[testimonialIndex].name} 
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{testimonials[testimonialIndex].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[testimonialIndex].role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">"{testimonials[testimonialIndex].content}"</p>
              <div className="mt-6 flex items-center justify-between">
                <button onClick={prevTestimonial} className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100">Previous</button>
                <div className="space-x-1">
                  {testimonials.map((_, idx) => (
                    <span key={idx} className={`inline-block w-2 h-2 rounded-full ${idx === testimonialIndex ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                  ))}
                </div>
                <button onClick={nextTestimonial} className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100">Next</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Join researchers worldwide.</span>
            <span className="block text-blue-200">Detect microplastics today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 bg-opacity-60 hover:bg-opacity-70"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
