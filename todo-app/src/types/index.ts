export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  tags: string[];
  dueDate?: string;
  reminderDate?: string;
  subtasks: Subtask[];
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  status: 'todo' | 'in-progress' | 'done';
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Stats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  overdue: number;
}

export interface FilterOptions {
  category?: string;
  priority?: string;
  status?: string;
  tags?: string[];
  searchQuery?: string;
}
