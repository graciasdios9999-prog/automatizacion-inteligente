'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import StatsCard from '@/components/dashboard/stats-card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ENGAGEMENT_DATA = [
  { date: 'Lun', engagement: 1200, impressions: 4000, leads: 24 },
  { date: 'Mar', engagement: 1900, impressions: 3000, leads: 18 },
  { date: 'Mié', engagement: 1500, impressions: 2000, leads: 32 },
  { date: 'Jue', engagement: 2200, impressions: 2780, leads: 39 },
  { date: 'Vie', engagement: 2800, impressions: 1890, leads: 48 },
  { date: 'Sáb', engagement: 2390, impressions: 2390, leads: 52 },
  { date: 'Dom', engagement: 3490, impressions: 4300, leads: 61 },
];

const TOP_CONTENT = [
  { title: '5 Pasos para Invertir en Acciones', engagement: 8.5, platform: 'Instagram' },
  { title: 'Mi Viaje a 6 Figuras', engagement: 7.8, platform: 'TikTok' },
  { title: 'Mindset del Dinero', engagement: 6.2, platform: 'X' },
];

export default function AnalyticsPage() {
  const stats = [
    { title: 'Impresiones', value: '24.5K', icon: '👁️' },
    { title: 'Engagement', value: '3.8K', icon: '💬' },
    { title: 'Leads Captados', value: '274', icon: '🎯' },
    { title: 'ROI Estimado', value: '$4.2K', icon: '💰' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">📊 Analytics Avanzado</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Métricas en tiempo real, insights IA y recomendaciones para optimizar tu estrategia
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Engagement Over Time */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Engagement Últimos 7 Días</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ENGAGEMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="engagement" stroke="#0284c7" fill="#0ea5e9" opacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Leads Over Time */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Leads Capturados</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ENGAGEMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔥 Contenido con Mayor Engagement</h2>
          <div className="space-y-4">
            {TOP_CONTENT.map((content, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{content.platform}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{content.engagement}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Engagement Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 rounded-2xl shadow-lg p-8 border border-purple-200 dark:border-purple-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🤖 Insights IA</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Mejor Horario para Publicar</h3>
                <p className="text-gray-600 dark:text-gray-300">Martes y Jueves entre 7-9 PM generan 45% más engagement</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📈</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Tipo de Contenido Ganador</h3>
                <p className="text-gray-600 dark:text-gray-300">Los casos de éxito tienen 3.2x más leads que otros tipos</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Oportunidad: TikTok</h3>
                <p className="text-gray-600 dark:text-gray-300">Enfócate en TikTok este mes - tasa de conversión 2x superior</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
