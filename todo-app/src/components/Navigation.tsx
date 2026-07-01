'use client';

import { useTaskStore } from '@/lib/store';
import { LayoutList, Trello, Calendar, BarChart3, Settings, Download, Upload, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const { setView, currentView, exportData, clearStorage } = useTaskStore();
  const [showSettings, setShowSettings] = useState(false);

  const views = [
    { id: 'list', label: 'List', icon: LayoutList },
    { id: 'kanban', label: 'Kanban', icon: Trello },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ] as const;

  const handleExport = (format: 'json' | 'csv') => {
    const data = exportData(format);
    const element = document.createElement('a');
    const file = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `tasks-${new Date().toISOString().split('T')[0]}.${format === 'json' ? 'json' : 'csv'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          useTaskStore.getState().importData(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
      <div className="p-6">
        {/* Views */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Views
          </h3>
          <div className="space-y-2">
            {views.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setView(id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                  currentView === id
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-800">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Data
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition font-medium"
            >
              <Download size={20} />
              Export
            </button>
            <button
              onClick={handleImport}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition font-medium"
            >
              <Upload size={20} />
              Import
            </button>
          </div>
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Settings
          </h3>
          <button
            onClick={() => {
              if (confirm('⚠️ This will delete ALL tasks. Are you sure?')) {
                clearStorage();
                window.location.reload();
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
          >
            <Trash2 size={20} />
            Clear All
          </button>
        </div>
      </div>

      {/* Export Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-sm">
            <h2 className="text-xl font-bold mb-4">Export Tasks</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  handleExport('json');
                  setShowSettings(false);
                }}
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                📦 Export as JSON
              </button>
              <button
                onClick={() => {
                  handleExport('csv');
                  setShowSettings(false);
                }}
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                📊 Export as CSV
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full px-4 py-3 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
