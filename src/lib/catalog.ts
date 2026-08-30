export type Offer = {
  sku: string;
  name: string;
  stripeProductId: string;
  priceUsd: number;
  interval: 'one_time' | 'month';
  paymentLink?: string;
  stream: 'midlife' | 'zeus' | 'b2b';
  replicateOf?: string;
};

/** Live Stripe product IDs verified 2026-08-29 on acct midelife. Links already in circulation. */
export const OFFERS: Offer[] = [
  {
    sku: 'guia-premium',
    name: 'Guía Premium Midlife Reset',
    stripeProductId: 'prod_V2SrQj7tUwv7Or',
    priceUsd: 47,
    interval: 'one_time',
    paymentLink: 'https://buy.stripe.com/cNi5kx1p7b7Wcnf2A37bW0m',
    stream: 'midlife',
  },
  {
    sku: 'curso-30d',
    name: 'Curso Inicial 30 Días Midlife Reset',
    stripeProductId: 'prod_V2Sr9Zcf7GNRx0',
    priceUsd: 97,
    interval: 'one_time',
    paymentLink: 'https://buy.stripe.com/fZubIV4Bja3S4UN8Yr7bW0n',
    stream: 'midlife',
  },
  {
    sku: 'essential',
    name: 'Membresía Essential Midlife Reset',
    stripeProductId: 'prod_V2SrASu96o2fkK',
    priceUsd: 29,
    interval: 'month',
    paymentLink: 'https://buy.stripe.com/bJecMZ9VD5NC86Zb6z7bW0o',
    stream: 'midlife',
  },
  {
    sku: 'club',
    name: 'Midlife Reset Club',
    stripeProductId: 'prod_UwbAR4UvAVerv1',
    priceUsd: 47,
    interval: 'month',
    paymentLink: 'https://buy.stripe.com/7sYcMZ7Nvb7Waf70rV7bW0p',
    stream: 'midlife',
  },
  {
    sku: 'vip-lab',
    name: 'VIP Continuity / Lab Pro',
    stripeProductId: 'prod_UwbAYwwc0PTtTS',
    priceUsd: 197,
    interval: 'month',
    paymentLink: 'https://buy.stripe.com/aFa00dc3Lek8evnb6z7bW0q',
    stream: 'midlife',
  },
  {
    sku: 'sesion-vip',
    name: 'Sesión VIP',
    stripeProductId: 'prod_UwbAYwwc0PTtTS',
    priceUsd: 997,
    interval: 'one_time',
    paymentLink: 'https://book.stripe.com/fZu6oBaZH5NCdrjb6z7bW06',
    stream: 'midlife',
  },
  {
    sku: 'latiz-21d',
    name: 'Protocolo Látiz Avanzado 21 Días',
    stripeProductId: 'prod_V83cNF9EnuNvpT',
    priceUsd: 67,
    interval: 'one_time',
    paymentLink: 'https://buy.stripe.com/fZu9ANd7P4JyevneiL7bW0t',
    stream: 'midlife',
  },
  {
    sku: 'bundle',
    name: 'Bundle Midlife Reset Completo',
    stripeProductId: 'prod_V83dMit91mKkGS',
    priceUsd: 147,
    interval: 'one_time',
    paymentLink: 'https://buy.stripe.com/3cI00d7Nv6RG3QJ0rV7bW0u',
    stream: 'midlife',
  },
  {
    sku: 'ritual',
    name: 'Ritual Kit',
    stripeProductId: 'prod_V2SrQj7tUwv7Or',
    priceUsd: 27,
    interval: 'one_time',
    paymentLink: 'https://buy.stripe.com/dRmdR3ffXdg4evn8Yr7bW0r',
    stream: 'midlife',
  },
  {
    sku: 'recipe',
    name: 'Recipe Vault',
    stripeProductId: 'prod_V2SrQj7tUwv7Or',
    priceUsd: 37,
    interval: 'one_time',
    paymentLink: 'https://buy.stripe.com/9B66oB8Rzfocfzr4Ib7bW0s',
    stream: 'midlife',
  },
];

export const CHANNELS = [
  'instagram',
  'tiktok',
  'youtube',
  'x',
  'facebook',
  'whatsapp',
  'email',
  'telegram',
] as const;

export function bestSeller(): Offer {
  return OFFERS.find((o) => o.sku === 'guia-premium') || OFFERS[0];
}

export function findOffer(sku: string): Offer | undefined {
  return OFFERS.find((o) => o.sku === sku);
}
