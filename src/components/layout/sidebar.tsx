'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Generador', href: '/dashboard/content-generator', icon: '✨' },
  { label: 'Calendario', href: '/dashboard/calendar', icon: '📅' },
  { label: 'Leads', href: '/dashboard/leads', icon: '🎯' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { label: 'Configuración', href: '/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transition-all duration-300 flex flex-col`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          {isOpen ? '🤖 MiroAgente' : '🤖'}
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-semibold'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <div className={`text-center text-xs font-semibold text-gray-600 dark:text-gray-400`}>
          {isOpen ? 'v0.1.0 Beta' : 'Beta'}
        </div>
      </div>
    </aside>
  );
}
