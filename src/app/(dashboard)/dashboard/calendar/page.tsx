'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { useState } from 'react';

const SCHEDULED_CONTENT = [
  {
    id: 1,
    title: '5 Pasos para Invertir en Acciones',
    platform: 'Instagram',
    date: '2026-07-02',
    time: '19:00',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'Cómo Pasé de Deudas a 6 Figuras',
    platform: 'TikTok',
    date: '2026-07-02',
    time: '20:00',
    status: 'scheduled',
  },
  {
    id: 3,
    title: 'Mindset del Dinero - Parte 1',
    platform: 'X',
    date: '2026-07-03',
    time: '18:00',
    status: 'scheduled',
  },
];

export default function CalendarPage() {
  const [content, setContent] = useState(SCHEDULED_CONTENT);
  const [view, setView] = useState<'week' | 'month'>('week');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">📅 Calendario Editorial</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestiona tu contenido programado y recibe sugerencias de temas trending</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                view === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                view === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              Mes
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Próximas Publicaciones</h2>
              <div className="space-y-4">
                {content.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg hover:shadow-md transition">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>📱 {item.platform}</span>
                        <span>📅 {item.date}</span>
                        <span>⏰ {item.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                        Editar
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔥 Temas Trending</h2>
            <div className="space-y-3">
              {[
                { topic: 'Inversión en Acciones', trend: '↑ +45%' },
                { topic: 'Criptomonedas 2026', trend: '↑ +38%' },
                { topic: 'Libertad Financiera', trend: '↑ +62%' },
                { topic: 'Ahorro Inteligente', trend: '↑ +51%' },
                { topic: 'Inversión Inmobiliaria', trend: '↑ +28%' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition cursor-pointer group"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {item.topic}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{item.trend}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              ✨ Generar Contenido Trending
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
