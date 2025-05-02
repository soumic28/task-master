'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Mock data
const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'Marketing Strategy',
    color: '#4F46E5',
    taskCount: 5,
    completedTaskCount: 2,
  },
  {
    id: '2',
    name: 'Website Redesign',
    color: '#10B981',
    taskCount: 8,
    completedTaskCount: 3,
  },
  {
    id: '3',
    name: 'Bug Fixes',
    color: '#EF4444',
    taskCount: 12,
    completedTaskCount: 7,
  },
];

const TASK_STATUS_DATA = [
  { name: 'Completed', value: 12, color: '#10B981' },
  { name: 'In Progress', value: 8, color: '#3B82F6' },
  { name: 'Not Started', value: 5, color: '#6B7280' },
];

const TASK_PRIORITY_DATA = [
  { name: 'High', tasks: 6 },
  { name: 'Medium', tasks: 11 },
  { name: 'Low', tasks: 8 },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // Set greeting based on time of day
      const hour = new Date().getHours();
      let greetingText = '';
      
      if (hour < 12) {
        greetingText = 'Good Morning';
      } else if (hour < 18) {
        greetingText = 'Good Afternoon';
      } else {
        greetingText = 'Good Evening';
      }
      
      setGreeting(greetingText);
      
      // Simulate loading data
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Get task statistics
  const totalTasks = MOCK_PROJECTS.reduce((sum, project) => sum + project.taskCount, 0);
  const completedTasks = MOCK_PROJECTS.reduce((sum, project) => sum + project.completedTaskCount, 0);
  const inProgressTasks = 5; // Mock data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              {greeting}, {session?.user?.name || 'User'}!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-gray-500 dark:text-gray-400 mt-1"
            >
              Here&apos;s an overview of your tasks and activities
            </motion.p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center space-x-4 transition-all duration-300"
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
              <FaTasks className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTasks}</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center space-x-4 transition-all duration-300"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <FaCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedTasks}</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center space-x-4 transition-all duration-300"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <FaClock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{inProgressTasks}</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center space-x-4 transition-all duration-300"
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <FaExclamationTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">6</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Charts */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Task Status Chart */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Task Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TASK_STATUS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TASK_STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '0.375rem',
                      border: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Task Priority Chart */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tasks by Priority</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={TASK_PRIORITY_DATA}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '0.375rem',
                      border: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="tasks" fill="#818CF8" barSize={40} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Quick Links */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/dashboard/tasks" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">View All Tasks</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Browse and manage all your tasks</p>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/dashboard/projects" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Manage Projects</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">View and organize your projects</p>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/dashboard/tasks" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Create New Task</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Add a new task to your list</p>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 