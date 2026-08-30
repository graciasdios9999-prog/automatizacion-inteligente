export interface ContentGenerationRequest {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'x';
  contentType?: 'reel' | 'carousel' | 'thread' | 'short' | 'video';
  category: string;
  topic?: string;
  targetAudience?: string;
  tone?: string;
}

export interface GeneratedContentResponse {
  title: string;
  content: string;
  hooks: string[];
  cta: string;
  hashtags: string[];
  emojis: string[];
  estimatedEngagement: 'low' | 'medium' | 'high';
  mode: string;
}

export async function generateFinancialContent(
  request: ContentGenerationRequest
): Promise<GeneratedContentResponse> {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return {
      title: `${request.topic || request.category} — ${request.platform}`,
      content: `Borrador para ${request.platform}. Conecta GROK_API_KEY para generar con IA.`,
      hooks: ['Hook 1', 'Hook 2', 'Hook 3'],
      cta: 'Comenta QUIERO y te mando el protocolo.',
      hashtags: ['#finanzas', '#midlife', '#zeus'],
      emojis: ['💪', '⚡', '💎'],
      estimatedEngagement: 'medium',
      mode: 'fallback',
    };
  }

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.NEXT_PUBLIC_GROK_MODEL || 'grok-2',
      temperature: 0.8,
      messages: [
        {
          role: 'system',
          content:
            'Copywriter de finanzas y midlife. Responde SOLO JSON: title, content, hooks, cta, hashtags, emojis, estimatedEngagement.',
        },
        { role: 'user', content: JSON.stringify(request) },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Grok HTTP ${res.status}`);
  }

  const payload = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = payload?.choices?.[0]?.message?.content || '';
  const match = text.match(/\{[\s\S]*\}/);
  const parsed = match ? (JSON.parse(match[0]) as Partial<GeneratedContentResponse>) : {};

  return {
    title: parsed.title || String(request.topic || request.category),
    content: parsed.content || text,
    hooks: parsed.hooks || [],
    cta: parsed.cta || 'Compra ahora',
    hashtags: parsed.hashtags || [],
    emojis: parsed.emojis || [],
    estimatedEngagement: parsed.estimatedEngagement || 'medium',
    mode: 'grok',
  };
}

export async function generateMultipleVariants(
  request: ContentGenerationRequest,
  count = 3
): Promise<GeneratedContentResponse[]> {
  const out: GeneratedContentResponse[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push(await generateFinancialContent(request));
  }
  return out;
}
