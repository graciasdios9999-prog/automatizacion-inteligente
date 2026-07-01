'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';

export default function SettingsPage() {
  const [socialAccounts, setSocialAccounts] = useState([
    { platform: 'Instagram', status: 'connected', icon: '📸' },
    { platform: 'TikTok', status: 'disconnected', icon: '🎵' },
    { platform: 'YouTube', status: 'disconnected', icon: '▶️' },
    { platform: 'X', status: 'disconnected', icon: '𝕏' },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">⚙️ Configuración</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestiona tus redes sociales, lead magnets y preferencias</p>
        </div>

        {/* Social Accounts */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📱 Redes Sociales Conectadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {socialAccounts.map((account) => (
              <div key={account.platform} className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{account.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{account.platform}</p>
                    <p className={`text-sm ${
                      account.status === 'connected'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {account.status === 'connected' ? '✓ Conectado' : '○ No conectado'}
                    </p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg font-semibold transition ${
                  account.status === 'connected'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {account.status === 'connected' ? 'Desconectar' : 'Conectar'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Magnets */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎁 Lead Magnets</h2>
          <div className="space-y-4 mb-6">
            {[
              { type: 'eBook', title: 'Guía de Inversión 2026', created: '2026-06-15' },
              { type: 'Calculadora', title: 'Calculadora de Ahorros', created: '2026-06-10' },
            ].map((magnet, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{magnet.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{magnet.type} • Creado: {magnet.created}</p>
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
          <button className="w-full py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition">
            + Crear Nuevo Lead Magnet
          </button>
        </div>

        {/* Automation Rules */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🤖 Reglas de Automatización</h2>
          <div className="space-y-4 mb-6">
            {[
              { name: 'Responder Comentarios', status: 'active' },
              { name: 'Enviar DM a Leads', status: 'active' },
              { name: 'Lead Nurturing', status: 'inactive' },
            ].map((rule, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{rule.name}</p>
                  <p className={`text-sm ${
                    rule.status === 'active'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {rule.status === 'active' ? '✓ Activo' : '○ Inactivo'}
                  </p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Configurar
                </button>
              </div>
            ))}
          </div>
          <button className="w-full py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition">
            + Crear Nueva Regla
          </button>
        </div>

        {/* Account */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">👤 Cuenta</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Tu Perfil</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona tu información personal</p>
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
