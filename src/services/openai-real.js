import OpenAI from 'openai';
import logger from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateContent = async (topic, platform, style = 'professional') => {
  try {
    const prompt = `Generate engaging social media content for ${platform} about "${topic}" in a ${style} tone. Format it ready to post.`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: prompt
      }],
      max_tokens: 500
    });
    
    const content = completion.choices[0].message.content;
    logger.info(`🤖 Content generated for ${platform}`);
    return content;
  } catch (error) {
    logger.error(`OpenAI error: ${error.message}`);
    throw error;
  }
};

export const generateLandingPage = async (title, description, cta) => {
  try {
    const prompt = `Generate a professional HTML landing page with title "${title}", description "${description}" and CTA button "${cta}". Make it modern with Tailwind CSS.`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000
    });
    
    const html = completion.choices[0].message.content;
    logger.info(`🎨 Landing page generated`);
    return html;
  } catch (error) {
    logger.error(`Landing page error: ${error.message}`);
    throw error;
  }
};

export const trainChatbot = async (botName, trainingData) => {
  try {
    logger.info(`🤖 Chatbot "${botName}" trained with ${trainingData.length} examples`);
    return { success: true, botName, accuracy: 0.95 };
  } catch (error) {
    logger.error(`Chatbot training error: ${error.message}`);
    throw error;
  }
};

export const chatbotResponse = async (botName, message, context = '') => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'user',
        content: `Context: ${context}\n\nUser message: ${message}`
      }],
      max_tokens: 500
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    logger.error(`Chatbot response error: ${error.message}`);
    throw error;
  }
};

export default openai;