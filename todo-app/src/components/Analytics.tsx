'use client';

import { useTaskStore } from '@/lib/store';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function Analytics() {
  const { getStats, tasks, categories } = useTaskStore();
  const stats = getStats();

  // Priority distribution
  const priorityData = [
    { name: 'High', value: tasks.filter((t) => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter((t) => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter((t) => t.priority === 'low').length },
  ];

  // Status distribution
  const statusData = [
    { name: 'To Do', value: tasks.filter((t) => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter((t) => t.status === 'in-progress').length },
    { name: 'Done', value: tasks.filter((t) => t.status === 'done').length },
  ];

  // Category distribution
  const categoryData = categories.map((cat) => ({
    name: cat.name,
    value: tasks.filter((t) => t.category === cat.id).length,
  }));

  // Completion rate over time (simulated)
  const completionTrend = [
    { day: 'Mon', completed: Math.floor(stats.completed * 0.2) },
    { day: 'Tue', completed: Math.floor(stats.completed * 0.35) },
    { day: 'Wed', completed: Math.floor(stats.completed * 0.5) },
    { day: 'Thu', completed: Math.floor(stats.completed * 0.65) },
    { day: 'Fri', completed: Math.floor(stats.completed * 0.8) },
    { day: 'Sat', completed: Math.floor(stats.completed * 0.9) },
    { day: 'Sun', completed: stats.completed },
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Analytics & Statistics</h2>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{stats.total}</p>
            </div>
            <AlertCircle size={32} className="text-blue-600 dark:text-blue-400 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{stats.completed}</p>
            </div>
            <CheckCircle2 size={32} className="text-green-600 dark:text-green-400 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Pending</p>
              <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100 mt-2">{stats.pending}</p>
            </div>
            <Clock size={32} className="text-yellow-600 dark:text-yellow-400 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">Overdue</p>
              <p className="text-3xl font-bold text-red-900 dark:text-red-100 mt-2">{stats.overdue}</p>
            </div>
            <Zap size={32} className="text-red-600 dark:text-red-400 opacity-20" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
        <h3 className="font-bold text-lg mb-4">Overall Progress</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 min-w-[80px] text-right">
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Priority Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-4">Tasks by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Trend */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-4">Weekly Completion Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
