'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import StatsCard from '@/components/dashboard/stats-card';
import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  // TODO: Replace with actual API calls
  const stats = [
    { title: 'Contenido Generado', value: '12', icon: '📝' },
    { title: 'Impresiones', value: '8.2K', icon: '👁️' },
    { title: 'Leads Capturados', value: '34', icon: '🎯' },
    { title: 'Tasa Conversión', value: '12.5%', icon: '💰' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Bienvenido de vuelta! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Aquí está tu resumen de hoy
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Engagement Últimos 7 Días</h2>
            <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">📊 Gráfico de engagement (próximamente)</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <a
                  href="/dashboard/content-generator"
                  className="block w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
                >
                  ✨ Generar Contenido
                </a>
                <a
                  href="/dashboard/calendar"
                  className="block w-full px-4 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition text-center border border-blue-500"
                >
                  📅 Ver Calendario
                </a>
                <a
                  href="/dashboard/leads"
                  className="block w-full px-4 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition text-center border border-blue-500"
                >
                  🎯 Gestionar Leads
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
