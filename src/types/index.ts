export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  taskId: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  taskId: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  order: number;
  projectId: string | null;
  project: Project | null;
  tags: Tag[];
  subtasks: Subtask[];
}

export interface TaskData {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  projectId: string | null;
  subtasks: {title: string; completed: boolean}[];
  tags: {name: string; color: string}[];
}

export interface TaskUpdateData {
  status?: string;
  order?: number;
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: Date | null;
  projectId?: string | null;
  subtasks?: Subtask[];
  tags?: Tag[];
} 