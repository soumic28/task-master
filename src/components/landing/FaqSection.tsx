'use client';

import { motion } from 'framer-motion';

export default function FaqSection() {
  const faqs = [
    {
      question: "How do I get started with TaskMaster?",
      answer: "Getting started is easy! Simply sign up for a free account, create your first project, and start adding tasks. Our intuitive interface will guide you through the process, and you can always refer to our documentation for detailed instructions."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Yes! TaskMaster is built for collaboration. You can invite team members to your projects, assign tasks, comment on items, and track progress together. Our real-time updates ensure everyone stays on the same page."
    },
    {
      question: "Is TaskMaster available on mobile devices?",
      answer: "Absolutely. TaskMaster is fully responsive and works on all devices. We also offer native mobile apps for iOS and Android, so you can manage your tasks on the go."
    },
    {
      question: "What makes TaskMaster different from other task managers?",
      answer: "TaskMaster combines powerful project management features with an intuitive, user-friendly interface. Our unique AI-powered task suggestions, customizable workflows, and seamless integrations set us apart from other solutions."
    },
    {
      question: "Is my data secure with TaskMaster?",
      answer: "We take security seriously. All data is encrypted in transit and at rest, and we use industry-standard security practices to protect your information. We also offer two-factor authentication for added security."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 rounded-full bg-purple-100 px-4 py-1 text-purple-700 font-medium text-sm"
          >
            FAQ
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about TaskMaster</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-6"
            >
              <motion.div 
                className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-semibold cursor-pointer list-none p-6">
                    <span className="text-xl text-gray-800">{faq.question}</span>
                    <motion.div
                      initial="collapsed"
                      variants={{
                        open: { rotate: 180 },
                        collapsed: { rotate: 0 }
                      }}
                      animate="collapsed"
                      className="group-open:rotate-180 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </summary>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                </details>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 