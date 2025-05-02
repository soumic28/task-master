'use client';

import { motion } from 'framer-motion';

export default function FeaturesSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 rounded-full bg-indigo-100 px-4 py-1 text-indigo-700 font-medium text-sm"
          >
            Powerful Features
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Designed for Professionals</h2>
          <p className="text-xl text-gray-600">Experience a new level of productivity with our premium tools.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Multiple Projects",
              description: "Organize your tasks into different projects to keep everything structured and easily accessible.",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              color: "indigo",
              delay: 0.1
            },
            {
              title: "Drag & Drop Interface",
              description: "Intuitively organize and prioritize tasks with our smooth drag-and-drop interface.",
              icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
              color: "purple",
              delay: 0.2
            },
            {
              title: "Smart Scheduling",
              description: "Set due dates, reminders, and recurrent tasks to never miss a deadline again.",
              icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              color: "pink",
              delay: 0.3
            }
          ].map((feature) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{
                y: -8, 
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-tr from-${feature.color}-50 to-${feature.color}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <motion.div 
                  className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-${feature.color}-200 transition-colors duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-${feature.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className={`text-${feature.color}-600 font-medium flex items-center`}
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Features Row */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Team Collaboration", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "blue" },
            { title: "Analytics Dashboard", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "indigo" },
            { title: "AI Task Suggestions", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", color: "purple" },
            { title: "Cross-Platform Sync", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", color: "pink" }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${feature.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h4>
              <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 