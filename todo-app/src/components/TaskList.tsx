'use client';

import { useTaskStore } from '@/lib/store';
import TaskCard from './TaskCard';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { sortTasks } from '@/lib/utils';
import { useState } from 'react';

export default function TaskList() {
  const { getFilteredTasks, tasks, filters } = useTaskStore();
  const [sortBy, setSortBy] = useState('created');

  const filteredTasks = getFilteredTasks();
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  const activeTasks = sortedTasks.filter((t) => !t.completed);
  const completedTasks = sortedTasks.filter((t) => t.completed);

  return (
    <div className="space-y-8">
      {/* Header with Sort */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Your Tasks</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {tasks.length} total • {activeTasks.length} active • {completedTasks.length} completed
          </p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-800"
        >
          <option value="created">Newest First</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {/* Active Tasks */}
      {activeTasks.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-primary-600" />
            Active Tasks ({activeTasks.length})
          </h3>
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Completed Tasks */}
      {completedTasks.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-3 opacity-75">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No tasks yet</h3>
          <p className="text-gray-600 dark:text-gray-400">Create your first task to get started!</p>
        </div>
      ) : null}

      {/* No Results */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">No tasks match your filters</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
