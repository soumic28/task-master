'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Task, TaskUpdateData } from '@/types';

interface TaskBoardProps {
  tasks: Task[];
  isLoading: boolean;
  onUpdateTask: (taskId: string, taskData: TaskUpdateData) => void;
  onDeleteTask: (taskId: string) => void;
  filter?: string;
}

export default function TaskBoard({ tasks, isLoading, onUpdateTask, onDeleteTask, filter = 'all' }: TaskBoardProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [orderedTasks, setOrderedTasks] = useState<Record<string, Task[]>>({
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  });
  
  // Group tasks by status and apply ordering
  useEffect(() => {
    // Apply filter if necessary
    let filteredTasks = tasks;
    
    if (filter === 'todo') {
      filteredTasks = tasks.filter(task => task.status === 'TODO');
    } else if (filter === 'inprogress') {
      filteredTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    } else if (filter === 'done') {
      filteredTasks = tasks.filter(task => task.status === 'DONE');
    }
    
    const todoTasks = filteredTasks.filter(task => task.status === 'TODO')
      .sort((a, b) => a.order - b.order);
    const inProgressTasks = filteredTasks.filter(task => task.status === 'IN_PROGRESS')
      .sort((a, b) => a.order - b.order);
    const doneTasks = filteredTasks.filter(task => task.status === 'DONE')
      .sort((a, b) => a.order - b.order);
    
    setOrderedTasks({
      TODO: todoTasks,
      IN_PROGRESS: inProgressTasks,
      DONE: doneTasks
    });
  }, [tasks, filter]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }
    
    const activeTaskId = active.id as string;
    const overColumn = over.id as string;
    
    // Find which column the task is currently in
    let sourceColumn: string | null = null;
    let activeTask: Task | null = null;
    
    for (const [column, columnTasks] of Object.entries(orderedTasks)) {
      const task = columnTasks.find(t => t.id === activeTaskId);
      if (task) {
        sourceColumn = column;
        activeTask = task;
        break;
      }
    }
    
    if (!sourceColumn || !activeTask || sourceColumn === overColumn) {
      setActiveId(null);
      return;
    }
    
    // Update the task's status and order in the database
    onUpdateTask(activeTaskId, { 
      status: overColumn,
      order: orderedTasks[overColumn].length // Add to the end of the column
    });
    
    // Update state to reflect the change immediately
    setOrderedTasks(prev => {
      // Remove from source column
      const sourceColumnTasks = prev[sourceColumn!].filter(task => task.id !== activeTaskId);
      
      // Add to destination column
      const updatedTask = {
        ...activeTask!,
        status: overColumn
      };
      
      const destinationColumnTasks = [...prev[overColumn], updatedTask];
      
      return {
        ...prev,
        [sourceColumn!]: sourceColumnTasks,
        [overColumn]: destinationColumnTasks
      };
    });
    
    setActiveId(null);
  };
  
  const handleStatusChange = (taskId: string, newStatus: string) => {
    onUpdateTask(taskId, { status: newStatus });
  };
  
  const toggleTaskExpanded = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };
  
  const renderColumn = (status: string, title: string, tasks: Task[], color: string) => {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 min-h-[200px]"
        data-status={status}
      >
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
          <span className={`h-3 w-3 rounded-full ${color} mr-2`}></span>
          {title}
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">({tasks.length})</span>
        </h3>
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                expanded={expandedTask === task.id}
                onExpand={toggleTaskExpanded}
                onStatusChange={handleStatusChange}
                onDelete={onDeleteTask}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-gray-700 rounded-md">
              No tasks
            </div>
          )}
        </div>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Find the active task for the overlay
  const getActiveTask = (): Task | null => {
    if (!activeId) return null;
    
    for (const columnTasks of Object.values(orderedTasks)) {
      const task = columnTasks.find(t => t.id === activeId);
      if (task) return task;
    }
    
    return null;
  };
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div id="TODO">
          {renderColumn('TODO', 'To Do', orderedTasks.TODO, 'bg-yellow-400')}
        </div>
        <div id="IN_PROGRESS">
          {renderColumn('IN_PROGRESS', 'In Progress', orderedTasks.IN_PROGRESS, 'bg-blue-400')}
        </div>
        <div id="DONE">
          {renderColumn('DONE', 'Done', orderedTasks.DONE, 'bg-green-400')}
        </div>
      </div>
      
      <DragOverlay>
        {activeId && getActiveTask() && (
          <div className="w-72 opacity-80">
            <TaskCard
              task={getActiveTask()!}
              expanded={false}
              onExpand={() => {}}
              onStatusChange={() => {}}
              onDelete={() => {}}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

interface TaskCardProps {
  task: Task;
  expanded: boolean;
  onExpand: (taskId: string) => void;
  onStatusChange: (taskId: string, status: string) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, expanded, onExpand, onStatusChange, onDelete }: TaskCardProps) {
  const priorityClasses = {
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const totalSubtasks = task.subtasks.length;
  
  return (
    <div 
      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-sm cursor-grab"
      draggable
    >
      <div className="flex items-start justify-between">
        <h4 
          className="font-medium text-gray-800 dark:text-white cursor-pointer flex-grow"
          onClick={() => onExpand(task.id)}
        >
          {task.title}
        </h4>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {expanded && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
          
          {task.project && (
            <div className="flex items-center mb-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: task.project.color }}></div>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{task.project.name}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-2">
            {task.tags.map(tag => (
              <span 
                key={tag.id} 
                className="text-xs px-2 py-1 rounded-full" 
                style={{ 
                  backgroundColor: `${tag.color}20`,
                  color: tag.color
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
          
          {task.subtasks.length > 0 && (
            <div className="mb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Subtasks ({completedSubtasks}/{totalSubtasks})
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                <div 
                  className="bg-indigo-600 h-1.5 rounded-full" 
                  style={{ width: `${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityClasses[task.priority as keyof typeof priorityClasses]}`}>
              {task.priority}
            </span>
            
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          
          <div className="flex justify-between mt-3">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="text-xs border border-gray-200 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-1"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </div>
      )}
      
      {!expanded && (
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityClasses[task.priority as keyof typeof priorityClasses]}`}>
              {task.priority}
            </span>
            
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          
          {task.subtasks.length > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{completedSubtasks}/{totalSubtasks}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                <div 
                  className="bg-indigo-600 h-1.5 rounded-full" 
                  style={{ width: `${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 