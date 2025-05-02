'use client';

import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    
    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {saved && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
          Settings saved successfully!
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <form onSubmit={handleSave}>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Appearance</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="theme-system"
                  type="radio"
                  name="theme"
                  className="h-4 w-4 text-indigo-600"
                  defaultChecked
                />
                <label htmlFor="theme-system" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  System Default
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="theme-light"
                  type="radio"
                  name="theme"
                  className="h-4 w-4 text-indigo-600"
                />
                <label htmlFor="theme-light" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Light Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="theme-dark"
                  type="radio"
                  name="theme"
                  className="h-4 w-4 text-indigo-600"
                />
                <label htmlFor="theme-dark" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Dark Mode
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Notifications</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="notifications-email"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded"
                  defaultChecked
                />
                <label htmlFor="notifications-email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="notifications-browser"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded"
                  defaultChecked
                />
                <label htmlFor="notifications-browser" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Browser Notifications
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 