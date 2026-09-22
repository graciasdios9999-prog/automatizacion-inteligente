export const STRIPE = {
 express:'https://buy.stripe.com/28EbIV0l31xmdrj5Mf7bW0A', guia:'https://buy.stripe.com/7sYcMZaZHfoc1IB5Mf7bW0v', bundle:'https://buy.stripe.com/3cI00d7Nv6RG3QJ0rV7bW0u', membresia:'https://buy.stripe.com/aFa7sFc3L0tifzr3E77bW0w', latiz:'https://buy.stripe.com/fZu9ANd7P4JyevneiL7bW0t', recipe:'https://buy.stripe.com/9B66oB8Rzfocfzr4Ib7bW0s', ritual:'https://buy.stripe.com/dRmdR3ffXdg4evn8Yr7bW0r', vip:'https://buy.stripe.com/aFa00dc3Lek8evnb6z7bW0q', club:'https://buy.stripe.com/7sYcMZ7Nvb7Waf70rV7bW0p', essential:'https://buy.stripe.com/bJecMZ9VD5NC86Zb6z7bW0o'
} as const;
export const YT='https://www.youtube.com/@michelgonzalez-q4o';
export const BOLT='https://midlife-reset-lab-pr-16us.bolt.host';
export const AMAZON_TAG='michelgonza0d-20';
export const CONTACT='graciasdios6666@gmail.com';
export const PDF_DELIVERY={guia:'1T_YzhTuWEff61vQ9VFY6_eqlV31D_73O',express:'16XkxVoswWAuXG5ZUwXZGeP2xMetMjOKq'} as const;
export const benefits=[
 {title:'Energía estable después de los 40',desc:'Rutinas simples para cortar el bajón sin depender de milagros.'},
 {title:'Sueño y recuperación real',desc:'Protocolos nocturnos que respetan tu biología.'},
 {title:'Claridad hormonal sin drama',desc:'Educación práctica sobre ciclos, estrés y hábitos.'},
 {title:'Rituales de 5-10 minutos',desc:'Diseñados para mujeres 40-60 con agenda llena.'},
 {title:'Comunidad + accountability',desc:'Ritmo semanal para sostener el cambio.'},
 {title:'Compras inteligentes (#ad)',desc:'Recomendaciones Amazon transparentes.'}
];
const base=[
 ['Empieza hoy','Protocolo Express 7 Días','$27','Pago único · primario',STRIPE.express,'Empezar Express — $27',true],
 ['21 días','Guía Premium Reset Hormonal 21 Días','$47','Pago único',STRIPE.guia,'Comprar guía — $47',false],
 ['Sistema','Bundle Completo','Bundle','Pago único',STRIPE.bundle,'Llevar bundle',false],
 ['Mensual','Membresía Mensual Acceso Completo','Mensual','Cancela cuando quieras',STRIPE.membresia,'Unirme',false],
 ['Avanzado','Protocolo Látiz Avanzado 21 Días','21 días','Pago único',STRIPE.latiz,'Comprar Látiz',false],
 ['Cocina','Recipe Vault + Meal Planner','Vault','Pago único',STRIPE.recipe,'Abrir Recipe Vault',false],
 ['Ritual','Kit Ritual','Kit','Pago único',STRIPE.ritual,'Comprar Kit Ritual',false],
 ['VIP','VIP Continuity / Lab Pro','Lab Pro','Continuidad premium',STRIPE.vip,'Entrar a Lab Pro',false],
 ['Club','Midlife Reset Club','Club','Comunidad mensual',STRIPE.club,'Unirme al Club',false],
 ['Base','Membresía Essential','Essential','Entrada mensual',STRIPE.essential,'Activar Essential',false]
] as const;
export const products=base.map(([badge,name,price,note,href,cta,highlight])=>({badge,name,price,note,href,cta,highlight,points:['Programa práctico para mujeres 40-60','Pago seguro alojado por Stripe','Acceso según el producto elegido']}));
export const faqs=[
 {q:'¿Esto es consejo médico?',a:'No. Es educación de bienestar. Consulta a tu médico.'},
 {q:'¿Cómo recibo el PDF?',a:'Por email vía Zap después del pago; no está abierto públicamente.'},
 {q:'¿Por dónde empiezo?',a:'Protocolo Express 7 Días ($27).'},
 {q:'¿Puedo cancelar?',a:'Sí, desde Stripe o escribiendo a graciasdios6666@gmail.com.'},
 {q:'¿Hay otra landing?',a:'Sí: https://midlife-reset-lab-pr-16us.bolt.host'}
];
