'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-28 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: 'url("/circuit-pattern.svg")',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{
          y: [50, 0, 50],
          x: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [50, 0, 50],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Particle effect (small dots) */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          const uniqueId = `particle-${i}-${Math.random()}`;
          return (
            <motion.div
              key={uniqueId}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          );
        })}
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1 border border-white/20"
          >
            <span className="text-sm font-medium">✨ Limited time offer</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Transform Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-200">Productivity?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100"
          >
            Join thousands of professionals who trust TaskMaster to manage their projects and tasks efficiently.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.span
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <Link href="/register" className="relative bg-white text-indigo-600 px-8 py-4 rounded-md font-medium hover:bg-opacity-95 transition shadow-lg inline-block">
                Sign Up for Free
              </Link>
            </motion.span>
            
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/demo" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition inline-block">
                Watch Demo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {['No credit card required', 'Cancel anytime', '14-day free trial', '24/7 support'].map((item, index) => (
              <div key={index} className="flex items-center justify-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 