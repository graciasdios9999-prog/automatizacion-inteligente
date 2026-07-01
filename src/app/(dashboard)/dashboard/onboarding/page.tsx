'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function OnboardingPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            ¡Bienvenido, {user?.firstName}! 🚀
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Vamos a configurar tu agente de IA para comenzar a generar contenido viral y capturar leads automáticamente.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Paso 1: Conecta tus Redes Sociales</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Conecta tus cuentas de Instagram, TikTok, YouTube y X para empezar a publicar automáticamente
              </p>
              <Link
                href="/dashboard/settings"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Conectar Redes →
              </Link>
            </div>

            <div className="border-l-4 border-indigo-600 pl-6 py-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Paso 2: Genera tu Primer Contenido</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Crea contenido financiero viral con nuestra IA especializada
              </p>
              <Link
                href="/dashboard/content-generator"
                className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Generar Contenido →
              </Link>
            </div>

            <div className="border-l-4 border-purple-600 pl-6 py-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Paso 3: Configura tu Lead Magnet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Crea un lead magnet (ebook, calculadora, mini-curso) para capturar leads de calidad
              </p>
              <Link
                href="/dashboard/settings"
                className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Configurar Lead Magnet →
              </Link>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-slate-700 rounded-lg border border-blue-200 dark:border-slate-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">💡 Pro Tip</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Comienza generando 3-5 piezas de contenido sobre temas de finanzas personales. Luego conecta tus redes y programa la publicación automática para los próximos 7 días.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
