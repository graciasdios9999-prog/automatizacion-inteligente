export type Offer = { sku:string; name:string; stripeProductId:string; priceUsd:number; interval:'one_time'|'month'; paymentLink?:string; stream:'midlife'|'zeus'|'b2b'; replicateOf?:string };

export const LIVE_CHECKOUT = {
  express27:'https://buy.stripe.com/28EbIV0l31xmdrj5Mf7bW0A',
  guia47:'https://buy.stripe.com/7sYcMZaZHfoc1IB5Mf7bW0v',
  bundle:'https://buy.stripe.com/3cI00d7Nv6RG3QJ0rV7bW0u',
  membresiaCompleta:'https://buy.stripe.com/aFa7sFc3L0tifzr3E77bW0w',
  latiz21:'https://buy.stripe.com/fZu9ANd7P4JyevneiL7bW0t',
  recipe:'https://buy.stripe.com/9B66oB8Rzfocfzr4Ib7bW0s',
  ritual:'https://buy.stripe.com/dRmdR3ffXdg4evn8Yr7bW0r',
  vipLab:'https://buy.stripe.com/aFa00dc3Lek8evnb6z7bW0q',
  club:'https://buy.stripe.com/7sYcMZ7Nvb7Waf70rV7bW0p',
  essential:'https://buy.stripe.com/bJecMZ9VD5NC86Zb6z7bW0o',
  boltLanding:'https://midlife-reset-lab-pr-16us.bolt.host',
  hostinger:'https://hotpink-quail-769272.hostingersite.com',
  amazonTag:'michelgonza0d-20'
} as const;

export const OFFERS: Offer[] = [
 ['express-7d','Protocolo Express 7 Días','prod_express7d',27,'one_time',LIVE_CHECKOUT.express27],
 ['guia-premium','Guía Premium Reset Hormonal 21 Días','prod_V2SrQj7tUwv7Or',47,'one_time',LIVE_CHECKOUT.guia47],
 ['bundle','Bundle Completo','prod_V83dMit91mKkGS',147,'one_time',LIVE_CHECKOUT.bundle],
 ['membresia-completa','Membresía Mensual Acceso Completo','prod_membresia_completa',27,'month',LIVE_CHECKOUT.membresiaCompleta],
 ['latiz-21d','Protocolo Látiz Avanzado 21 Días','prod_V83cNF9EnuNvpT',67,'one_time',LIVE_CHECKOUT.latiz21],
 ['recipe','Recipe Vault + Meal Planner','prod_recipe',37,'one_time',LIVE_CHECKOUT.recipe],
 ['ritual','Kit Ritual','prod_ritual',27,'one_time',LIVE_CHECKOUT.ritual],
 ['vip-lab','VIP Continuity / Lab Pro','prod_UwbAYwwc0PTtTS',197,'month',LIVE_CHECKOUT.vipLab],
 ['club','Midlife Reset Club','prod_UwbAR4UvAVerv1',47,'month',LIVE_CHECKOUT.club],
 ['essential','Membresía Essential','prod_V2SrASu96o2fkK',29,'month',LIVE_CHECKOUT.essential]
].map(([sku,name,stripeProductId,priceUsd,interval,paymentLink]) => ({sku,name,stripeProductId,priceUsd,interval,paymentLink,stream:'midlife'} as Offer));

export const CHANNELS = ['instagram','tiktok','youtube','x','facebook','whatsapp','email','telegram'] as const;
export function bestSeller(){ return OFFERS[0]; }
export function findOffer(sku:string){ return OFFERS.find(o=>o.sku===sku); }
