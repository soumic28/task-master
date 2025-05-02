'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-95"></div>
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: 'url("/grid-pattern.svg")',
          backgroundSize: '30px 30px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-indigo-400 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-3 rounded-full bg-indigo-400/30 backdrop-blur-sm px-4 py-1 border border-indigo-300/20"
            >
              <span className="text-sm font-medium">✨ Next-generation task management</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Master Your Tasks <br/>with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-indigo-200">Elegance</span>
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 text-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Manage multiple projects, track tasks and boost your productivity with our advanced task management system.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></div>
                <Link href="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-md font-medium hover:bg-opacity-95 transition shadow-md inline-block">
                  Get Started
                </Link>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
                <Link href="/about" className="border-2 border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition inline-block">
                  Learn More
                </Link>
              </motion.span>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={`w-10 h-10 rounded-full border-2 border-indigo-700 overflow-hidden bg-gradient-to-br from-indigo-${400 + num*100} to-purple-${500 + num*100}`}>
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                      {String.fromCharCode(64 + num)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-indigo-100">
                <span className="font-semibold">4,000+</span> professionals trust us
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-64 md:h-96 w-full">
              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-[90%] h-[90%]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"></div>
                  <Image 
                    src="/globe.svg" 
                    alt="TaskMaster Dashboard Preview"
                    fill
                    className="object-contain drop-shadow-2xl p-6"
                    priority
                  />
                  
                  {/* Floating elements around the main image */}
                  <motion.div 
                    className="absolute -top-6 -right-6 w-24 h-16 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-white text-lg font-bold">85%</div>
                      <div className="text-indigo-200 text-xs">Completed</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-32 h-16 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex items-center justify-center p-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white text-xs">Task Complete</div>
                        <div className="text-indigo-200 text-xs">Just now</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </section>
  );
} 