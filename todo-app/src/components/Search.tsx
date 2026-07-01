'use client';

import { useState, useEffect } from 'react';
import { useTaskStore } from '@/lib/store';
import { Search as SearchIcon, X } from 'lucide-react';

export default function Search() {
  const { setFilters, filters, clearFilters } = useTaskStore();
  const [query, setQuery] = useState(filters.searchQuery || '');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowInput(!showInput);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showInput]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) {
      setFilters({ searchQuery: value });
    } else {
      clearFilters();
    }
  };

  return (
    <div className="relative">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition text-sm"
        >
          <SearchIcon size={18} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-slate-700 rounded">⌘K</kbd>
        </button>
      ) : (
        <div className="absolute right-0 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800 z-50">
          <div className="p-4">
            <input
              autoFocus
              type="text"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => !query && setShowInput(false)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
            />
            {query && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
