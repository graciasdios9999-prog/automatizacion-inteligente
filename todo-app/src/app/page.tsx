'use client';

import { useEffect, useState } from 'react';
import { useTaskStore } from '@/lib/store';
import Navigation from '@/components/Navigation';
import TaskList from '@/components/TaskList';
import KanbanBoard from '@/components/KanbanBoard';
import Calendar from '@/components/Calendar';
import Analytics from '@/components/Analytics';
import TaskForm from '@/components/TaskForm';
import Search from '@/components/Search';
import { Plus, Moon, Sun } from 'lucide-react';

export default function Home() {
  const { initialize, currentView, theme, toggleTheme, tasks } = useTaskStore();
  const [mounted, setMounted] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      await initialize();
      setMounted(true);
    };
    initializeStore();
  }, [initialize]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✓</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Taskify Pro
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Search />
              <button
                onClick={() => setShowNewTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                <Plus size={20} />
                New Task
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentView === 'list' && <TaskList />}
            {currentView === 'kanban' && <KanbanBoard />}
            {currentView === 'calendar' && <Calendar />}
            {currentView === 'analytics' && <Analytics />}
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      {showNewTaskForm && (
        <TaskForm onClose={() => setShowNewTaskForm(false)} />
      )}
    </div>
  );
}
