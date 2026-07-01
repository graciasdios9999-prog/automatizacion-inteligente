import { create } from 'zustand';
import { Task, Category, Stats, FilterOptions } from '@/types';
import { loadFromStorage, saveToStorage } from './storage';

interface TaskStore {
  tasks: Task[];
  categories: Category[];
  filters: FilterOptions;
  currentView: 'list' | 'kanban' | 'calendar' | 'analytics';
  theme: 'light' | 'dark';
  
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  toggleTaskFavorite: (id: string) => void;
  
  // Subtask actions
  addSubtask: (taskId: string, title: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  
  // Filter actions
  setFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  
  // View actions
  setView: (view: 'list' | 'kanban' | 'calendar' | 'analytics') => void;
  
  // Theme
  toggleTheme: () => void;
  
  // Data management
  getStats: () => Stats;
  getFilteredTasks: () => Task[];
  exportData: (format: 'json' | 'csv') => string;
  importData: (data: string) => void;
  
  // Initialization
  initialize: () => Promise<void>;
}

const createInitialCategories = (): Category[] => [
  { id: '1', name: 'Work', color: '#3b82f6', icon: '💼' },
  { id: '2', name: 'Personal', color: '#8b5cf6', icon: '👤' },
  { id: '3', name: 'Shopping', color: '#ec4899', icon: '🛒' },
  { id: '4', name: 'Health', color: '#10b981', icon: '❤️' },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  categories: createInitialCategories(),
  filters: {},
  currentView: 'list',
  theme: 'light',

  addTask: (taskData) =>
    set((state) => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTasks = [...state.tasks, newTask];
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  updateTask: (id, updates) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  toggleTaskCompletion: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, status: !task.completed ? 'done' : 'todo' }
          : task
      );
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  toggleTaskFavorite: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      );
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  addSubtask: (taskId, title) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...task.subtasks, { id: `sub-${Date.now()}`, title, completed: false }],
            }
          : task
      );
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  toggleSubtask: (taskId, subtaskId) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((sub) =>
                sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
              ),
            }
          : task
      );
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  deleteSubtask: (taskId, subtaskId) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId) }
          : task
      );
      saveToStorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  addCategory: (categoryData) =>
    set((state) => {
      const newCategory: Category = { id: `cat-${Date.now()}`, ...categoryData };
      const updatedCategories = [...state.categories, newCategory];
      saveToStorage('categories', updatedCategories);
      return { categories: updatedCategories };
    }),

  deleteCategory: (id) =>
    set((state) => {
      const updatedCategories = state.categories.filter((cat) => cat.id !== id);
      saveToStorage('categories', updatedCategories);
      return { categories: updatedCategories };
    }),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  clearFilters: () => set({ filters: {} }),

  setView: (view) => set({ currentView: view }),

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      saveToStorage('theme', newTheme);
      return { theme: newTheme };
    }),

  getStats: () => {
    const tasks = get().tasks;
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      highPriority: tasks.filter((t) => t.priority === 'high' && !t.completed).length,
      overdue: tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length,
    };
  },

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    return tasks.filter((task) => {
      if (filters.category && task.category !== filters.category) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.status && task.status !== filters.status) return false;
      if (filters.tags && filters.tags.length > 0 && !filters.tags.some((tag) => task.tags.includes(tag))) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return task.title.toLowerCase().includes(query) || task.description?.toLowerCase().includes(query);
      }
      return true;
    });
  },

  exportData: (format) => {
    const tasks = get().tasks;
    if (format === 'json') {
      return JSON.stringify(tasks, null, 2);
    } else {
      const headers = ['Title', 'Description', 'Priority', 'Category', 'Status', 'Due Date', 'Completed'];
      const rows = tasks.map((task) => [
        task.title,
        task.description || '',
        task.priority,
        task.category,
        task.status,
        task.dueDate || '',
        task.completed ? 'Yes' : 'No',
      ]);
      const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
      return csv;
    }
  },

  importData: (data) => {
    try {
      const importedTasks = JSON.parse(data);
      if (Array.isArray(importedTasks)) {
        saveToStorage('tasks', importedTasks);
        set({ tasks: importedTasks });
      }
    } catch (error) {
      console.error('Import failed:', error);
    }
  },

  initialize: async () => {
    const tasks = await loadFromStorage('tasks');
    const categories = await loadFromStorage('categories');
    const theme = await loadFromStorage('theme');

    set({
      tasks: tasks || [],
      categories: categories || createInitialCategories(),
      theme: theme || 'light',
    });
  },
}));
