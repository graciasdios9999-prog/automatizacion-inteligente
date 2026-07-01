import Anthropic from '@anthropic-ai/sdk';

if (!process.env.GROK_API_KEY) {
  throw new Error('GROK_API_KEY is not set');
}

const client = new Anthropic({
  apiKey: process.env.GROK_API_KEY,
  baseURL: 'https://api.x.ai',
});

export interface ContentGenerationRequest {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'x';
  contentType: 'reel' | 'carousel' | 'thread' | 'short' | 'video';
  category: 'investment_tips' | 'mindset' | 'case_study' | 'educational' | 'motivation';
  topic?: string;
  targetAudience?: string;
  tone?: 'professional' | 'casual' | 'motivational';
}

export interface GeneratedContentResponse {
  title: string;
  content: string;
  hooks: string[];
  cta: string;
  hashtags: string[];
  emojis: string[];
  estimatedEngagement: 'low' | 'medium' | 'high';
}

const FINANCIAL_PROMPTS = {
  investment_tips: `You are a financial content expert specializing in personal wealth building and smart investing. Generate compelling, educational content about investing, crypto, real estate, or passive income that educates and engages a financial freedom-seeking audience.`,
  
  mindset: `You are a financial mindset coach. Create motivational, transformative content about money psychology, abundance mindset, overcoming financial fears, and building wealth consciousness. Make it relatable and actionable.`,
  
  case_study: `You are a success storyteller. Create engaging case studies showing real examples of people building wealth, achieving financial freedom, or transforming their finances. Include specific numbers, strategies, and lessons learned.`,
  
  educational: `You are a financial educator. Create clear, easy-to-understand educational content about personal finance topics: budgeting, investing, debt management, taxes, retirement planning. Make complex topics simple and actionable.`,
  
  motivation: `You are a financial freedom motivator. Create posts that inspire people to take action toward their financial goals. Use powerful stories, statistics, and calls-to-action that drive engagement and interest in financial growth.`,
};

async function generateFinancialContent(
  request: ContentGenerationRequest
): Promise<GeneratedContentResponse> {
  const systemPrompt = FINANCIAL_PROMPTS[request.category];
  
  const platformSpecificInstructions = {
    instagram: `Create content for Instagram Reels or Carousel. Keep it visual, hook-driven, and include 3-5 trending emojis. Total character limit: 2200. Start with a power hook in the first line.`,
    tiktok: `Create content for TikTok Shorts. Keep it punchy, fast-paced, and viral. Include trendy phrases and use ALL CAPS for emphasis. Character limit: 1500. Start with a 5-second hook.`,
    youtube: `Create a script for YouTube Shorts/Vertical Video. Include timestamps, visual descriptions, and B-roll suggestions. Make it 15-30 seconds of spoken content. Character limit: 2000.`,
    x: `Create a Twitter thread about ${request.topic || 'financial growth'}. Start with a hook tweet, then 5-7 follow-up tweets. Use clear numbering (1/ 2/ 3/ etc). Include actionable insights.`,
  };

  const userPrompt = `
Generate ${request.contentType} content for ${request.platform} about: ${request.topic || request.category}

Target audience: ${request.targetAudience || 'People interested in personal finance and wealth building (18-55 years old)'}
Tone: ${request.tone || 'motivational and educational'}

Platform guidelines: ${platformSpecificInstructions[request.platform]}

IMPORTANT: Your response MUST be valid JSON in this exact format (no markdown, no code blocks, pure JSON):
{
  "title": "string (max 100 chars)",
  "content": "string (main post content)",
  "hooks": ["hook1", "hook2", "hook3"],
  "cta": "string (call-to-action, max 150 chars)",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "emojis": ["emoji1", "emoji2", "emoji3"],
  "estimatedEngagement": "high"
}

Generate content that:
1. Educates about finance/wealth building
2. Triggers emotional response (motivation, curiosity, FOMO)
3. Includes specific, actionable advice
4. Drives engagement (questions, shares, saves, clicks)
5. Positions the creator as an authority
  `;

  try {
    const response = await client.messages.create({
      model: 'grok-2',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Grok API');
    }

    // Parse JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]) as GeneratedContentResponse;
    return parsed;
  } catch (error) {
    console.error('Error generating content with Grok:', error);
    throw error;
  }
}

async function generateMultipleVariants(
  request: ContentGenerationRequest,
  count: number = 3
): Promise<GeneratedContentResponse[]> {
  const variants: GeneratedContentResponse[] = [];

  for (let i = 0; i < count; i++) {
    const variant = await generateFinancialContent(request);
    variants.push(variant);
    // Add slight delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return variants;
}

export { generateFinancialContent, generateMultipleVariants };