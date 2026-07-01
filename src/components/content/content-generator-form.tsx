'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateFinancialContent, ContentGenerationRequest } from '@/lib/api/grok';
import ContentPreview from './content-preview';

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: '📷' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'x', label: 'X (Twitter)', icon: '𝕏' },
];

const CATEGORIES = [
  { id: 'investment_tips', label: 'Tips de Inversión', icon: '📈' },
  { id: 'mindset', label: 'Mentalidad Financiera', icon: '🧠' },
  { id: 'case_study', label: 'Casos de Éxito', icon: '🎯' },
  { id: 'educational', label: 'Educativo', icon: '📚' },
  { id: 'motivation', label: 'Motivación', icon: '🚀' },
];

export default function ContentGeneratorForm() {
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'youtube' | 'x'>('instagram');
  const [category, setCategory] = useState<
    'investment_tips' | 'mindset' | 'case_study' | 'educational' | 'motivation'
  >('investment_tips');
  const [contentType, setContentType] = useState<'reel' | 'carousel' | 'thread' | 'short' | 'video'>('reel');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'motivational'>('motivational');
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: async (request: ContentGenerationRequest) => {
      return await generateFinancialContent(request);
    },
    onSuccess: (data) => {
      setGeneratedContent(data);
    },
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      platform,
      contentType,
      category,
      topic: topic || undefined,
      tone,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">✨ Generador IA</h2>

        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Plataforma
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as any)}
                  className={`p-3 rounded-lg font-medium transition ${
                    platform === p.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Categoría
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as any)}
                  className={`p-2 rounded-lg text-sm font-medium transition ${
                    category === c.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Tema (Opcional)
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej: inversión en acciones, ahorros, blockchain..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Tono
            </label>
            <div className="flex gap-3">
              {['professional', 'casual', 'motivational'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t as any)}
                  className={`flex-1 p-2 rounded-lg font-medium text-sm transition ${
                    tone === t
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? '⏳ Generando...' : '✨ Generar Contenido'}
          </button>
        </form>
      </div>

      {/* Preview */}
      {generatedContent && <ContentPreview content={generatedContent} />}
    </div>
  );
}
