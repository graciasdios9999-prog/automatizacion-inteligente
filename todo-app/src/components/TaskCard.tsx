'use client';

import { Task } from '@/types';
import { useTaskStore } from '@/lib/store';
import { formatDate, isOverdue, getPriorityColor, getStatusIcon } from '@/lib/utils';
import { Trash2, Star, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask, toggleTaskCompletion, toggleTaskFavorite, addSubtask, toggleSubtask } = useTaskStore();
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [showNewSubtask, setShowNewSubtask] = useState(false);

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      addSubtask(task.id, newSubtaskTitle);
      setNewSubtaskTitle('');
      setShowNewSubtask(false);
    }
  };

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

  return (
    <div
      className={`p-4 rounded-lg border-l-4 transition ${
        task.completed
          ? 'bg-gray-50 dark:bg-slate-800/50 border-gray-300 dark:border-slate-700'
          : 'bg-white dark:bg-slate-900 border-primary-500'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="mt-1 w-5 h-5 cursor-pointer"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold transition ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            <button
              onClick={() => toggleTaskFavorite(task.id)}
              className="text-gray-400 hover:text-yellow-500 transition flex-shrink-0"
            >
              <Star size={18} fill={task.isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Tags and Metadata */}
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${ getPriorityColor(task.priority) }`}>
              {task.priority.toUpperCase()}
            </span>

            {task.dueDate && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                isOverdue(task.dueDate) && !task.completed
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}>
                📅 {formatDate(task.dueDate)}
              </span>
            )}

            {task.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded-full text-gray-700 dark:text-gray-300">
                #{tag}
              </span>
            ))}
          </div>

          {/* Subtasks */}
          {task.subtasks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700"
              >
                {showSubtasks ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                Subtasks ({completedSubtasks}/{task.subtasks.length})
              </button>

              {showSubtasks && (
                <div className="mt-3 space-y-2">
                  {task.subtasks.map((subtask) => (
                    <label key={subtask.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => toggleSubtask(task.id, subtask.id)}
                        className="w-4 h-4"
                      />
                      <span className={subtask.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}>
                        {subtask.title}
                      </span>
                    </label>
                  ))}

                  {showNewSubtask && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Add subtask..."
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded focus:outline-none dark:bg-slate-800"
                        autoFocus
                      />
                      <button onClick={handleAddSubtask} className="text-primary-600 hover:text-primary-700 font-semibold">
                        Add
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setShowNewSubtask(!showNewSubtask)}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 mt-2"
                  >
                    <Plus size={14} /> Add subtask
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-600 transition flex-shrink-0"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
