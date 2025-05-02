'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Redirect to login page with success message
      router.push('/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.4)" },
    tap: { scale: 0.95 }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col bg-gradient-to-tl from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-indigo-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.h1 
              className="text-xl font-bold text-gray-800 dark:text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              TaskMaster
            </motion.h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl p-1"
        >
          <div className="relative p-8">
            <motion.div 
              className="absolute inset-0 z-0 bg-gradient-to-br from-purple-100 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl opacity-50"
              animate={{ 
                background: [
                  "linear-gradient(to bottom right, rgb(243, 232, 255, 0.5), rgb(224, 231, 255, 0.5))",
                  "linear-gradient(to bottom right, rgb(237, 233, 254, 0.5), rgb(219, 234, 254, 0.5))",
                  "linear-gradient(to bottom right, rgb(243, 232, 255, 0.5), rgb(224, 231, 255, 0.5))"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-1"
              >
                Join TaskMaster
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center text-gray-500 dark:text-gray-400 mb-8"
              >
                Create your account and start being productive
              </motion.p>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg"
                  >
                    <div className="flex items-start">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: [0, 10, -10, 0], scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0 mt-0.5"
                      >
                        <FiAlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                      </motion.div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.form 
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="mb-5" variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="John Doe"
                      required
                    />
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                      initial={{ width: 0 }}
                      whileFocus={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div className="mb-5" variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="your@email.com"
                      required
                    />
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                      initial={{ width: 0 }}
                      whileFocus={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div className="mb-5" variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                      initial={{ width: 0 }}
                      whileFocus={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div className="mb-6" variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                      initial={{ width: 0 }}
                      whileFocus={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-3 px-4 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-medium flex items-center justify-center"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.2 }}
                  >
                    <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
                    {!isLoading && (
                      <motion.span 
                        className="ml-2"
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <FiArrowRight className="h-5 w-5" />
                      </motion.span>
                    )}
                    <motion.div 
                      className="absolute inset-0 bg-white"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 3, opacity: 0.2, transition: { duration: 0.5 } }}
                    />
                  </motion.button>
                </motion.div>
              </motion.form>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    Log In
                  </Link>
                </p>
              </motion.div>
              
              <motion.div 
                className="absolute -z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 rounded-full blur-3xl bg-purple-300/20 dark:bg-purple-600/20"
                animate={{ 
                  scaleX: [1, 1.1, 0.9, 1],
                  scaleY: [1, 0.9, 1.1, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10,
                  repeatType: "mirror" 
                }}
              />
            </div>
          </div>
        </motion.div>
        
        {/* Abstract background shapes */}
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-500/30 dark:from-purple-500/10 dark:to-indigo-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1.1, 1],
            rotate: [0, -15, -5, 0],
            opacity: [0.3, 0.5, 0.3, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400/30 to-pink-500/30 dark:from-indigo-600/10 dark:to-pink-600/10 blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1, 1.1],
            rotate: [0, 15, 5, 0],
            opacity: [0.3, 0.5, 0.4, 0.3] 
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
        />
      </main>
    </motion.div>
  );
} 