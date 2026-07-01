'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import ContentGeneratorForm from '@/components/content/content-generator-form';

export default function ContentGeneratorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ✨ Generador de Contenido Financiero
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crea contenido viral optimizado para cada plataforma con IA especializada en finanzas personales
          </p>
        </div>

        <ContentGeneratorForm />
      </div>
    </DashboardLayout>
  );
}
