import { FaMicroscope, FaFlask, FaChartLine, FaShieldAlt } from 'react-icons/fa';

export default function About() {
  const features = [
    {
      icon: <FaMicroscope className="h-8 w-8 text-blue-600" />,
      title: 'Advanced Detection',
      description: 'Cutting-edge technology for precise microplastic identification and analysis.'
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-green-600" />,
      title: 'Real-time Analytics',
      description: 'Instant insights with our comprehensive data visualization tools.'
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-yellow-600" />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your research data.'
    },
    {
      icon: <FaFlask className="h-8 w-8 text-purple-600" />,
      title: 'Research Focused',
      description: 'Designed by scientists for scientists to advance microplastic research.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="relative h-64 sm:h-80 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
          <img
            className="w-full h-full object-cover opacity-75"
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Scientist analyzing water samples"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="lg:ml-auto lg:w-1/2 lg:pl-10">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              About Our Technology
            </h2>
            <p className="mt-6 text-lg text-blue-100">
              Our advanced microplastic detection platform combines cutting-edge AI with powerful analytics 
              to help researchers and environmental scientists identify and analyze microplastic contamination 
              with unprecedented accuracy and efficiency.
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Revolutionizing Microplastic Research
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our comprehensive platform provides researchers with the tools needed to advance microplastic 
              detection and analysis in water samples worldwide.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Our Team
              </h2>
              <p className="text-xl text-gray-500">
                Meet the dedicated team behind our platform.
              </p>
            </div>
            <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: 'John Doe',
                  role: 'CEO & Founder',
                  imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                },
                {
                  name: 'Jane Smith',
                  role: 'CTO',
                  imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                },
                {
                  name: 'Mike Johnson',
                  role: 'Lead Developer',
                  imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                },
              ].map((person) => (
                <li key={person.name} className="py-10 px-6 bg-white text-center rounded-lg xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <img className="mx-auto h-40 w-40 rounded-full xl:w-40 xl:h-40" src={person.imageUrl} alt="" />
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-gray-900">{person.name}</h3>
                        <p className="text-blue-600">{person.role}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Sign up for free today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of educators and administrators already using our platform.
          </p>
          <a
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Sign up for free
          </a>
        </div>
      </div>
    </div>
  );
}
