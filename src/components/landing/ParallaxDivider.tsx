'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ParallaxDivider() {
  return (
    <section className="relative h-80 overflow-hidden bg-indigo-900">
      <motion.div 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}
        className="absolute inset-0"
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
      <div className="container mx-auto px-4 h-full relative z-10 flex flex-col items-center justify-center text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to revolutionize how your team works?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-md font-medium hover:bg-opacity-95 transition shadow-lg inline-block">
            Get Started Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 