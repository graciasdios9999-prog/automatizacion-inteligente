'use client';

import { useState } from 'react';

const CONTENT_CATEGORIES = [
  { id: 'investment_tips', label: '📈 Tips de Inversión', desc: 'Consejos rápidos y prácticos' },
  { id: 'mindset', label: '🧠 Mentalidad Financiera', desc: 'Cambiar creencias limitantes' },
  { id: 'case_study', label: '🎯 Casos de Éxito', desc: 'Historias inspiradoras reales' },
  { id: 'educational', label: '📚 Educativo', desc: 'Aprende conceptos financieros' },
  { id: 'motivation', label: '🚀 Motivación', desc: 'Inspira a tomar acción' },
];

export default function CategorySelector() {
  const [selected, setSelected] = useState('investment_tips');

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {CONTENT_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelected(cat.id)}
          className={`text-left p-4 rounded-lg border-2 transition ${
            selected === cat.id
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900 dark:border-blue-500'
              : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
          }`}
        >
          <h3 className="font-bold text-gray-900 dark:text-white">{cat.label}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{cat.desc}</p>
        </button>
      ))}
    </div>
  );
}
