import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

const faqs = [
  {
    question: 'What is microplastic detection?',
    answer: 'Microplastic detection involves identifying and analyzing tiny plastic particles (less than 5mm in size) in water samples using advanced imaging and machine learning technologies.'
  },
  {
    question: 'How accurate is your detection system?',
    answer: 'Our AI-powered system achieves over 95% accuracy in identifying and classifying microplastics, with continuous improvements through machine learning.'
  },
  {
    question: 'What types of microplastics can be detected?',
    answer: 'Our system can detect various types of microplastics including fragments, fibers, films, and microbeads across different polymer types like PET, PP, PE, and PS.'
  },
  {
    question: 'What equipment do I need to use this platform?',
    answer: 'You\'ll need a microscope with a digital camera for sample imaging. Our platform is compatible with most standard laboratory microscopes and digital imaging systems.'
  },
  {
    question: 'How do I prepare water samples for analysis?',
    answer: 'Samples should be filtered through a fine mesh (typically 0.45-1.2μm), dried, and placed on a glass slide. Detailed preparation guidelines are available in our documentation.'
  },
  {
    question: 'Can I analyze samples in real-time?',
    answer: 'Yes, our platform supports real-time analysis with results typically available within seconds after image capture, depending on sample complexity and processing requirements.'
  },
  {
    question: 'How is my data stored and secured?',
    answer: 'All data is encrypted both in transit and at rest. We implement industry-standard security measures and comply with relevant data protection regulations.'
  },
  {
    question: 'Can I export my analysis results?',
    answer: 'Yes, you can export your results in multiple formats including CSV, PDF, and Excel for further analysis or inclusion in research publications.'
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center py-4 w-full text-left focus:outline-none"
      onClick={onClick}
    >
      <span className="font-medium text-gray-900">{question}</span>
      {isOpen ? (
        <FaChevronUp className="h-5 w-5 text-blue-600" />
      ) : (
        <FaChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="pb-4 pr-12">
        <p className="text-gray-600">{answer}</p>
      </div>
    )}
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <FaQuestionCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="divide-y divide-gray-200">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Microplastic Detection FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </div>

          {/* Still have questions? */}
          <div className="mt-16 pt-10">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Still have questions?</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="mt-6">
                  <a
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-600">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
