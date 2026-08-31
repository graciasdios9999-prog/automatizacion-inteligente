export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Auth desactivada. El sitio corre sin claves.
        </h1>
        <a href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Ir al Dashboard
        </a>
      </div>
    </div>
  );
}
