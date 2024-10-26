// src/components/FAQ.js
import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the purpose of your financial education platform?",
      answer: "Our platform aims to bridge the gap in accessible financial education in India, especially in rural and semi-urban areas. We provide personalized learning paths using AI and data analytics, ensuring that users can make informed financial decisions."
    },
    {
      question: "How does your platform use AI for financial education?",
      answer: "We leverage AI to create personalized learning experiences, offering tailored educational content based on individual user profiles. Our AI-powered virtual financial advisors provide real-time guidance and support."
    },
    {
      question: "What types of content can I expect from your platform?",
      answer: "Our platform offers interactive simulations, gamified learning experiences, and localized content. We also feature community engagement opportunities for peer discussions and support."
    },
    {
      question: "Is there a cost associated with using the platform?",
      answer: "We follow a freemium model. Basic financial education content is available for free, while premium features can be accessed through a subscription."
    },
    {
      question: "How can I track my learning progress on the platform?",
      answer: "Users can track their progress through personalized dashboards that display completed courses and ongoing learning paths."
    },
    {
      question: "Are there opportunities for community engagement?",
      answer: "Yes! Our platform encourages community engagement through forums and discussion boards."
    },
    {
      question: "How does your platform ensure content is relevant and effective?",
      answer: "We continuously update our content based on user feedback, market trends, and financial developments in India."
    },
    {
      question: "Can I access your platform on mobile devices?",
      answer: "Absolutely! Our platform is designed to be mobile-friendly, ensuring access to financial education content anytime and anywhere."
    },
    {
      question: "How does your platform plan to scale?",
      answer: "We aim for rapid scalability by expanding our content offerings and forming partnerships with financial institutions."
    },
    {
      question: "Who can benefit from using your platform?",
      answer: "Our platform is designed for anyone seeking to improve their financial literacy, including students and working professionals."
    },
  ];

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="flex flex-wrap justify-center">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full md:w-1/2 p-4">
              <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                <button
                  className="w-full text-left font-semibold text-lg"
                  onClick={() => toggleOpen(index)}
                >
                  {faq.question}
                </button>
                {openIndex === index && (
                  <div className="mt-2 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
