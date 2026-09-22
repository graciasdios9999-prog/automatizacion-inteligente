export const STRIPE = {
  guia: 'https://buy.stripe.com/cNi00d5Fnfocbjba2v7bW0x',
  membresia: 'https://buy.stripe.com/14AeV77Nv8ZOcnf3E77bW0y',
  bundle: 'https://buy.stripe.com/cNi7sFaZHcc01IBb6z7bW0z',
} as const;

export const YT = 'https://www.youtube.com/@michelgonzalez-q4o';
export const AMAZON_TAG = 'michelgonza0d-20';
export const CONTACT = 'graciasdios6666@gmail.com';

export const benefits = [
  { title: 'Energia estable despues de los 40', desc: 'Rutinas simples para cortar el bajon de la tarde sin depender de cafeina extra ni milagros.' },
  { title: 'Sueno y recuperacion real', desc: 'Protocolos nocturnos que respetan tu biologia: menos scroll, mas descanso profundo.' },
  { title: 'Claridad hormonal sin drama', desc: 'Educacion practica sobre ciclos, estres y habitos que si puedes sostener en la vida real.' },
  { title: 'Rituales de 5-10 minutos', desc: 'Disenados para mamas, profesionales y cualquiera con agenda llena. Cero gym de 2 horas.' },
  { title: 'Comunidad + accountability', desc: 'La membresia te da ritmo semanal, recordatorios y un sistema que no se cae a la semana 2.' },
  { title: 'Compras inteligentes (#ad)', desc: 'Recomendamos productos verificados en Amazon con transparencia. Tag: michelgonza0d-20.' },
];

export const products = [
  {
    badge: 'Mas vendida',
    name: 'Guia Premium Reset Hormonal 21 Dias',
    price: '$47',
    note: 'Pago unico',
    href: STRIPE.guia,
    cta: 'Comprar guia - $47',
    points: [
      'Plan dia a dia para resetear energia, sueno y habitos',
      'Checklists imprimibles + tracking semanal',
      'Ideal si quieres resultados sin compromiso mensual',
    ],
    highlight: false,
  },
  {
    badge: 'Mejor valor',
    name: 'Bundle Completo Midlife Reset',
    price: '$147',
    note: 'Guia + extras · pago unico',
    href: STRIPE.bundle,
    cta: 'Llevar bundle - $147',
    points: [
      'Guia 21 dias + recursos premium del Lab',
      'Ahorro frente a comprar por separado',
      'Para quien quiere el sistema completo de una vez',
    ],
    highlight: true,
  },
  {
    badge: 'Continuo',
    name: 'Membresia Midlife Reset Lab',
    price: '$27',
    note: 'por mes · cancela cuando quieras',
    href: STRIPE.membresia,
    cta: 'Unirme - $27/mes',
    points: [
      'Nuevo contenido y rituales cada semana',
      'Soporte de comunidad y ritmo constante',
      'Perfecta si quieres accountability mes a mes',
    ],
    highlight: false,
  },
];

export const faqs = [
  { q: 'Esto es consejo medico?', a: 'No. Midlife Reset Lab es educacion de bienestar y habitos. Consulta siempre a tu medico antes de cambiar suplementos, dieta o ejercicio.' },
  { q: 'Como recibo la guia despues de pagar?', a: 'Stripe confirma el pago al instante. Recibiras acceso/instrucciones en el correo asociado a la compra. Dudas: graciasdios6666@gmail.com.' },
  { q: 'Puedo cancelar la membresia?', a: 'Si. La membresia de $27/mes se cancela cuando quieras desde el portal de Stripe o escribiendonos.' },
  { q: 'Que significa #ad en Amazon?', a: 'Algunos enlaces de productos son afiliados (tag michelgonza0d-20). Si compras, podemos recibir comision sin costo extra para ti. Siempre lo marcamos con #ad.' },
  { q: 'Esta en espanol?', a: 'Si. Contenido, guias y videos del canal Midlife Reset Lab estan pensados en espanol para mujeres (y hombres) en la etapa midlife.' },
];
