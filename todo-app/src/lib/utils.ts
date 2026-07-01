import { Task } from '@/types';

export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'text-red-500 bg-red-50 dark:bg-red-900';
    case 'medium':
      return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900';
    case 'low':
      return 'text-green-500 bg-green-50 dark:bg-green-900';
    default:
      return 'text-gray-500 bg-gray-50 dark:bg-gray-900';
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'todo':
      return '⭕';
    case 'in-progress':
      return '🔄';
    case 'done':
      return '✅';
    default:
      return '📋';
  }
};

export const sortTasks = (tasks: Task[], sortBy: string): Task[] => {
  const sorted = [...tasks];
  switch (sortBy) {
    case 'priority':
      return sorted.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    case 'dueDate':
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    case 'created':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default:
      return sorted;
  }
};

export const calculateProgress = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100);
};
