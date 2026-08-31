'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🤖 MiroAgente
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Tu Agente de IA para <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Redes Sociales Financieras</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Genera contenido viral sobre finanzas, captura leads automáticamente y construye tu comunidad de seguidores de alto valor en piloto automático.
            </p>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
              >
                Comenzar Gratis 🚀
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              >
                Ver Features
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="h-12 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 rounded-lg"></div>
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-gray-100 dark:bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Features que Generan Resultados 💰
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Generador IA Especializado',
                desc: 'Crea contenido financiero viral con hooks, CTAs y emojis optimizados automáticamente',
              },
              {
                icon: '📱',
                title: 'Multi-Plataforma',
                desc: 'Publica automáticamente en Instagram, TikTok, YouTube y X adaptando el contenido a cada plataforma',
              },
              {
                icon: '🎯',
                title: 'Lead Generation Automática',
                desc: 'Captura leads de comentarios y DMs, clasifica por temperatura y nutre automáticamente',
              },
              {
                icon: '📊',
                title: 'Analytics Inteligente',
                desc: 'Dashboard con ROI estimado, insights sobre qué contenido funciona y recomendaciones IA',
              },
              {
                icon: '🤖',
                title: 'Respuestas IA Automáticas',
                desc: 'Contesta comentarios y DMs con respuestas inteligentes adaptadas a tu audiencia',
              },
              {
                icon: '📅',
                title: 'Calendario Editorial',
                desc: 'Planifica con sugerencias de temas trending y mejores horarios por plataforma',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-gray-50 dark:bg-slate-700 rounded-2xl hover:shadow-lg transition border border-gray-200 dark:border-slate-600"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para Automatizar tu Estrategia Financiera?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a coaches, creadores y expertos que ya están generando leads de alta calidad automáticamente
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Crear Cuenta Gratis 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
