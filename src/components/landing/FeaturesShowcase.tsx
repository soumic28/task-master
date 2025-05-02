'use client';

import { motion } from 'framer-motion';

export default function FeaturesShowcase() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
      
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Designed for efficiency</h2>
          <p className="text-xl text-gray-600">Scroll to discover how TaskMaster elevates your workflow</p>
        </motion.div>

        <div className="relative h-[600px] max-w-6xl mx-auto">
          <div className="sticky top-[20vh]">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Intuitive Dashboard",
                  description: "Get a bird's-eye view of all your projects and tasks in one place",
                  icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
                  color: "indigo",
                  delay: 0
                },
                {
                  title: "Smart Notifications",
                  description: "Stay updated with intelligent reminders and notifications",
                  icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
                  color: "purple",
                  delay: 0.1
                },
                {
                  title: "Progress Analytics",
                  description: "Track your productivity with detailed visual analytics",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                  color: "pink",
                  delay: 0.2
                }
              ].map((feature) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${feature.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 bg-white p-8 rounded-2xl shadow-lg overflow-hidden relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-10"></div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Seamless Integration</h3>
                  <p className="text-gray-600 mb-6">Connect TaskMaster with your favorite tools like Slack, Google Calendar, GitHub, and more to create a centralized workflow hub.</p>
                  
                  <div className="flex flex-wrap gap-4">
                    {['Slack', 'GitHub', 'Zoom', 'Google'].map((tool) => (
                      <div key={tool} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                        <div className={`w-3 h-3 rounded-full bg-${['indigo', 'blue', 'cyan', 'purple'][tool === 'Slack' ? 0 : tool === 'GitHub' ? 1 : tool === 'Zoom' ? 2 : 3]}-500`}></div>
                        <span className="text-sm font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-10"></div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 relative">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-gray-500">TaskMaster</div>
                      </div>
                      <div className="space-y-3">
                        {['Meeting notes synced from Google Calendar', 'Code review reminder from GitHub', 'Team discussion from Slack'].map((item, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                            className="flex items-center gap-2 p-2 rounded bg-gray-50"
                          >
                            <div className={`w-2 h-2 rounded-full bg-${['purple', 'blue', 'indigo'][index]}-500`}></div>
                            <span className="text-xs text-gray-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 