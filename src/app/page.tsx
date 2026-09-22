export const metadata = {
  title: 'Midlife Reset Lab | Guia, Membresia y Bundle',
  description:
    'Recupera energia, sueno y claridad despues de los 40. Guia $47, membresia $27/mes, bundle $147. Stripe seguro. YouTube @michelgonzalez-q4o.',
};

const STRIPE = {
  guia: 'https://buy.stripe.com/cNi00d5Fnfocbjba2v7bW0x',
  membresia: 'https://buy.stripe.com/14AeV77Nv8ZOcnf3E77bW0y',
  bundle: 'https://buy.stripe.com/cNi7sFaZHcc01IBb6z7bW0z',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f5] text-stone-900">
      <div className="bg-stone-900 text-stone-100 text-center text-sm py-2 px-4">
        Midlife Reset Lab · Stripe seguro ·{' '}
        <a className="underline" href="https://www.youtube.com/@michelgonzalez-q4o" target="_blank" rel="noopener noreferrer">
          YouTube @michelgonzalez-q4o
        </a>
      </div>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <p className="text-rose-800 text-sm font-semibold mb-3">Bienestar hormonal · +40</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Recupera tu energia, sueno y claridad en la <span className="text-rose-700">mitad de la vida</span>
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mb-8">
          Guia 21 dias, membresia mensual y bundle completo. Pago seguro con Stripe. Educacion midlife en espanol.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <a href={STRIPE.guia} target="_blank" rel="noopener noreferrer" className="rounded-full bg-rose-700 text-white font-semibold px-7 py-3.5 text-center hover:bg-rose-800">
            Guia 21 dias - $47
          </a>
          <a href={STRIPE.membresia} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-stone-900 font-semibold px-7 py-3.5 text-center hover:bg-stone-900 hover:text-white">
            Membresia - $27/mes
          </a>
          <a href={STRIPE.bundle} target="_blank" rel="noopener noreferrer" className="rounded-full bg-stone-900 text-white font-semibold px-7 py-3.5 text-center hover:bg-black">
            Bundle - $147
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            ['Guia Premium Reset Hormonal 21 Dias', '$47', 'Pago unico', STRIPE.guia, 'Comprar guia'],
            ['Bundle Completo Midlife Reset', '$147', 'Mejor valor', STRIPE.bundle, 'Llevar bundle'],
            ['Membresia Midlife Reset Lab', '$27/mes', 'Cancela cuando quieras', STRIPE.membresia, 'Unirme'],
          ].map(([name, price, note, href, cta]) => (
            <article key={name as string} className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm flex flex-col">
              <h2 className="font-bold text-lg mb-2">{name}</h2>
              <p className="text-3xl font-bold text-rose-800 mb-1">{price}</p>
              <p className="text-sm text-stone-500 mb-6">{note}</p>
              <a href={href as string} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center rounded-full bg-rose-700 text-white font-semibold py-3 hover:bg-rose-800">
                {cta}
              </a>
            </article>
          ))}
        </div>
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-stone-600 mb-10">
          <strong>#ad Amazon:</strong> recomendaciones con tag <code>michelgonza0d-20</code>. Puede generarnos comision.
          {' '}
          <a className="underline text-rose-700" href="https://www.amazon.com/?tag=michelgonza0d-20" target="_blank" rel="noopener noreferrer sponsored">
            Ver Amazon
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-3">Beneficios midlife</h2>
            <ul className="space-y-2 text-stone-600 text-sm">
              <li>• Energia estable despues de los 40</li>
              <li>• Sueno y recuperacion real</li>
              <li>• Claridad hormonal sin drama</li>
              <li>• Rituales de 5-10 minutos</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">YouTube</h2>
            <p className="text-stone-600 text-sm mb-4">Canal Midlife Reset Lab - rituales y educacion sin postureo.</p>
            <a href="https://www.youtube.com/@michelgonzalez-q4o" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-red-600 text-white font-semibold px-5 py-2.5 hover:bg-red-700">
              Abrir canal
            </a>
          </div>
        </div>
        <details className="mb-3 rounded-xl border border-stone-200 bg-white p-4">
          <summary className="font-semibold cursor-pointer">Esto es consejo medico?</summary>
          <p className="text-sm text-stone-600 mt-2">No. Es educacion de bienestar. Consulta a tu medico.</p>
        </details>
        <details className="mb-3 rounded-xl border border-stone-200 bg-white p-4">
          <summary className="font-semibold cursor-pointer">Como recibo la guia?</summary>
          <p className="text-sm text-stone-600 mt-2">Stripe confirma al instante. Acceso por email. Dudas: graciasdios6666@gmail.com</p>
        </details>
        <footer className="mt-16 pt-8 border-t border-rose-100 text-sm text-stone-500">
          <p className="font-bold text-stone-900 mb-2">Midlife Reset Lab</p>
          <p>
            Contacto:{' '}
            <a className="text-rose-700 underline" href="mailto:graciasdios6666@gmail.com">
              graciasdios6666@gmail.com
            </a>
          </p>
          <p className="mt-4">
            <a className="underline" href="/midlife.html">
              Ver landing completa
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
}
