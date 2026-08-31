'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import StatsCard from '@/components/dashboard/stats-card';

interface Lead {
  id: number;
  username: string;
  platform: string;
  temperature: 'cold' | 'warm' | 'hot';
  status: 'new' | 'contacted' | 'interested' | 'converted';
  engagementScore: number;
  initialMessage: string;
  createdAt: string;
}

const MOCK_LEADS: Lead[] = [
  {
    id: 1,
    username: '@investor_juan',
    platform: 'Instagram',
    temperature: 'hot',
    status: 'interested',
    engagementScore: 8.5,
    initialMessage: '¿Cómo empiezo a invertir en acciones?',
    createdAt: '2026-07-01',
  },
  {
    id: 2,
    username: '@maria_finanzas',
    platform: 'TikTok',
    temperature: 'warm',
    status: 'contacted',
    engagementScore: 6.2,
    initialMessage: 'Me encantó tu contenido sobre ahorros',
    createdAt: '2026-06-30',
  },
  {
    id: 3,
    username: '@carlos_cripto',
    platform: 'X',
    temperature: 'cold',
    status: 'new',
    engagementScore: 4.1,
    initialMessage: 'Interesado en tu tema',
    createdAt: '2026-06-29',
  },
];

const TEMPERATURE_CONFIG = {
  hot: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: '🔥 Caliente' },
  warm: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: '🌡️ Tibio' },
  cold: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: '❄️ Frío' },
};

const STATUS_CONFIG = {
  new: { icon: '⭐', label: 'Nuevo' },
  contacted: { icon: '✉️', label: 'Contactado' },
  interested: { icon: '💬', label: 'Interesado' },
  converted: { icon: '💰', label: 'Convertido' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [filterTemperature, setFilterTemperature] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = filterTemperature === 'all' ? leads : leads.filter((l) => l.temperature === filterTemperature);

  const stats = [
    { title: 'Leads Totales', value: leads.length, icon: '🎯' },
    { title: 'Leads Calientes', value: leads.filter((l) => l.temperature === 'hot').length, icon: '🔥' },
    { title: 'Convertidos', value: leads.filter((l) => l.status === 'converted').length, icon: '💰' },
    { title: 'Tasa Conversión', value: '8.5%', icon: '📈' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">🎯 Gestión de Leads</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Captura automática de leads de redes sociales, clasificación por temperatura y nurturing automático
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Leads Table */}
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Recientes</h2>
              <div className="flex gap-2">
                {['all', 'hot', 'warm', 'cold'].map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setFilterTemperature(temp as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                      filterTemperature === temp
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {temp === 'all' ? 'Todos' : temp === 'hot' ? '🔥' : temp === 'warm' ? '🌡️' : '❄️'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Usuario</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Plataforma</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Temperatura</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Engagement</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white text-sm">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium text-sm">{lead.username}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">{lead.platform}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${TEMPERATURE_CONFIG[lead.temperature].color}`}>
                          {TEMPERATURE_CONFIG[lead.temperature].label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          {STATUS_CONFIG[lead.status].icon}
                          {STATUS_CONFIG[lead.status].label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-16 bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${(lead.engagementScore / 10) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold">
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead Details */}
          {selectedLead ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl shadow-lg p-8 sticky top-8 max-h-[calc(100vh-100px)] overflow-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detalles del Lead</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Usuario</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedLead.username}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Plataforma</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedLead.platform}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Temperatura</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-2 ${TEMPERATURE_CONFIG[selectedLead.temperature].color}`}>
                    {TEMPERATURE_CONFIG[selectedLead.temperature].label}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Engagement</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                        style={{ width: `${(selectedLead.engagementScore / 10) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedLead.engagementScore}/10</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Mensaje Inicial</p>
                  <div className="mt-2 p-3 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                    <p className="text-gray-900 dark:text-white text-sm italic">&ldquo;{selectedLead.initialMessage}&rdquo;</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Fecha</p>
                  <p className="text-gray-900 dark:text-white">{selectedLead.createdAt}</p>
                </div>

                <div className="pt-4 flex flex-col gap-2 border-t border-gray-200 dark:border-slate-600">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                    ✉️ Enviar Lead Magnet
                  </button>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm">
                    💬 Contactar Ahora
                  </button>
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-sm">
                    🔥 Marcar como Caliente
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Selecciona un lead para ver detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
