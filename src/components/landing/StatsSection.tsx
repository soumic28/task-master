'use client';

import { motion } from 'framer-motion';

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" },
            { number: "15K+", label: "Tasks Created" },
            { number: "4.9/5", label: "User Rating" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (0.1 * index) }}
                className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 