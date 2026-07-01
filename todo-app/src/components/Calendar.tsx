'use client';

import { useTaskStore } from '@/lib/store';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import TaskCard from './TaskCard';

export default function Calendar() {
  const { getFilteredTasks } = useTaskStore();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1));
  const filteredTasks = getFilteredTasks();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return filteredTasks.filter((t) => t.dueDate?.startsWith(dateStr));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Calendar</h2>
        <div className="flex gap-4">
          <button onClick={previousMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition">
            <ChevronLeft size={24} />
          </button>
          <span className="text-xl font-semibold capitalize min-w-[200px] text-center">{monthName}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold text-sm p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((day, idx) => {
          const tasksForDay = day ? getTasksForDate(day) : [];
          return (
            <div
              key={idx}
              className={`min-h-[100px] p-2 rounded-lg border-2 ${
                day
                  ? 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-primary-500 transition'
                  : 'bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700'
              }`}
            >
              {day && (
                <>
                  <div className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-400">{day}</div>
                  {tasksForDay.length > 0 && (
                    <div className="space-y-1">
                      {tasksForDay.slice(0, 2).map((task) => (
                        <div key={task.id} className="text-xs p-1 bg-primary-100 dark:bg-primary-900/30 rounded truncate text-primary-700 dark:text-primary-400">
                          {task.title}
                        </div>
                      ))}
                      {tasksForDay.length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">+{tasksForDay.length - 2} more</div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Tasks for selected date details */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Tasks by Date</h3>
        <div className="grid gap-6">
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const tasksForDay = getTasksForDate(day);
            return tasksForDay.length > 0 ? (
              <div key={day}>
                <h4 className="font-semibold mb-3 text-lg">
                  {new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </h4>
                <div className="space-y-3">
                  {tasksForDay.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
