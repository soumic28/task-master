'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiArrowRight, FiCheck } from 'react-icons/fi';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(registered === 'true');

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl p-1"
    >
      <div className="relative p-8">
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl opacity-50"
          animate={{ 
            background: [
              "linear-gradient(to bottom right, rgb(238, 242, 255, 0.5), rgb(219, 234, 254, 0.5))",
              "linear-gradient(to bottom right, rgb(224, 231, 255, 0.5), rgb(229, 241, 255, 0.5))",
              "linear-gradient(to bottom right, rgb(238, 242, 255, 0.5), rgb(219, 234, 254, 0.5))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-1"
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-gray-500 dark:text-gray-400 mb-8"
          >
            Log in to continue your productivity journey
          </motion.p>
          
          <AnimatePresence>
            {showSuccessMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg bg-green-50 dark:bg-green-900/30 p-4 mb-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <FiCheck className="h-5 w-5 text-green-400 dark:text-green-300" />
                    </motion.div>
                  </div>
                  <div className="ml-3">
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="text-sm font-medium text-green-800 dark:text-green-200"
                    >
                      Account created successfully! You can now sign in.
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          
          <motion.form 
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-5" variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
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
            
            <motion.div className="mb-6" variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
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
            
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3 px-4 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium flex items-center justify-center"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2 }}
              >
                <span>{isLoading ? 'Logging in...' : 'Log In'}</span>
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
              Don&apos;t have an account?{' '}
              <Link 
                href="/register" 
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
          
          <motion.div 
            className="absolute -z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 rounded-full blur-3xl bg-indigo-300/20 dark:bg-indigo-600/20"
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
  );
}

export default function Login() {
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
      className="min-h-screen flex flex-col bg-gradient-to-bl from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
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

      <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
        
        {/* Abstract background shapes */}
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 dark:from-blue-500/10 dark:to-purple-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1.1, 1],
            rotate: [0, 15, 5, 0],
            opacity: [0.3, 0.5, 0.3, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400/30 to-pink-500/30 dark:from-indigo-600/10 dark:to-pink-600/10 blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1, 1.1],
            rotate: [0, -15, -5, 0],
            opacity: [0.3, 0.5, 0.4, 0.3] 
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
        />
      </main>
    </motion.div>
  );
} 