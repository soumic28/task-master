'use client';

import { Subtask } from '@/types';

interface TodoProps {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  subtasks: Subtask[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function Todo({ 
  id, 
  title, 
  description, 
  status, 
  priority, 
  subtasks,
  onStatusChange,
  onDelete
}: TodoProps) {
  const priorityColors = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800'
  };
  
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const progress = subtasks.length > 0 
    ? Math.round((completedSubtasks / subtasks.length) * 100) 
    : 0;
  
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
            {priority}
          </span>
          
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          
          <button 
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {subtasks.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-3 space-y-2">
            {subtasks.map(subtask => (
              <div key={subtask.id} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={subtask.completed} 
                  className="h-4 w-4 text-indigo-600 rounded"
                  readOnly
                />
                <span className={`ml-2 text-sm ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 