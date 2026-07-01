'use client';

import { useTaskStore } from '@/lib/store';
import TaskCard from './TaskCard';
import { Task } from '@/types';

const STATUSES = ['todo', 'in-progress', 'done'] as const;
const STATUS_LABELS = {
  'todo': '📋 To Do',
  'in-progress': '🔄 In Progress',
  'done': '✅ Done',
};
const STATUS_COLORS = {
  'todo': 'border-blue-300 dark:border-blue-700',
  'in-progress': 'border-yellow-300 dark:border-yellow-700',
  'done': 'border-green-300 dark:border-green-700',
};

export default function KanbanBoard() {
  const { getFilteredTasks, updateTask } = useTaskStore();
  const filteredTasks = getFilteredTasks();

  const getTasksByStatus = (status: string): Task[] => {
    return filteredTasks.filter((t) => t.status === status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const task = filteredTasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, { status: status as any });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Kanban Board</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {STATUSES.map((status) => (
          <div
            key={status}
            className={`bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border-t-4 ${STATUS_COLORS[status]}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 className="font-bold text-lg mb-4">
              {STATUS_LABELS[status]}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({getTasksByStatus(status).length})</span>
            </h3>
            <div className="space-y-3 min-h-[400px]">
              {getTasksByStatus(status).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                  className="cursor-move"
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
