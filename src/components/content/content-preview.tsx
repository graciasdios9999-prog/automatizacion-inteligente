'use client';

export default function ContentPreview({ content }: { content: any }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 sticky top-8 max-h-[calc(100vh-100px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vista Previa</h2>

      <div className="space-y-4">
        {/* Title */}
        {content.title && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Título</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{content.title}</p>
          </div>
        )}

        {/* Content */}
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Contenido</p>
          <div className="mt-2 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap text-sm leading-relaxed">
              {content.content}
            </p>
          </div>
        </div>

        {/* Hooks */}
        {content.hooks && content.hooks.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Hooks</p>
            <div className="mt-2 space-y-2">
              {content.hooks.map((hook: string, i: number) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <p className="text-gray-700 dark:text-gray-300">{hook}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {content.cta && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Call to Action</p>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-700 dark:text-blue-200 font-semibold text-sm">{content.cta}</p>
            </div>
          </div>
        )}

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Hashtags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {content.hashtags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full text-sm font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Emojis */}
        {content.emojis && content.emojis.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Emojis Sugeridos</p>
            <div className="mt-2 text-3xl space-y-1 flex gap-2">
              {content.emojis.map((emoji: string, i: number) => (
                <span key={i}>{emoji}</span>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Prediction */}
        {content.estimatedEngagement && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Engagement Esperado</p>
            <div className="mt-2">
              <div className="inline-block px-4 py-2 rounded-full font-bold text-sm" style={{
                backgroundColor: content.estimatedEngagement === 'high' ? '#dcfce7' : content.estimatedEngagement === 'medium' ? '#fef3c7' : '#fee2e2',
                color: content.estimatedEngagement === 'high' ? '#166534' : content.estimatedEngagement === 'medium' ? '#92400e' : '#991b1b',
              }}>
                {content.estimatedEngagement === 'high' ? '🔥 Alto' : content.estimatedEngagement === 'medium' ? '⭐ Medio' : '❄️ Bajo'}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 border-t border-gray-200 dark:border-slate-700">
          <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
            📅 Programar
          </button>
          <button className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm">
            ✨ Generar Más
          </button>
        </div>
      </div>
    </div>
  );
}
