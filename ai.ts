/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';
import { getChat, updateChat } from '../lib/database';

export const name = 'ai_command';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/ai (.+)/s, async (msg, match) => {
    const chatId = msg.chat.id;
    const prompt = match ? match[1] : '';

    if (!prompt) {
        bot.sendMessage(chatId, 'Please provide a prompt. Example: `/ai What is the capital of France?`');
        return;
    }

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    // Set status to "typing..."
    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatSettings = await getChat(chatId) || { id: chatId };
      const history = chatSettings.history || [];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: 'You are NexAi, a helpful, creative, and friendly AI assistant. Your goal is to provide accurate, engaging, and concise information. When responding, always refer to yourself as NexAi. Be conversational and approachable.',
        },
      });

      const text = response.text || 'No response generated.';
      
      const newHistory = [
        ...history,
        { role: 'user', parts: [{ text: prompt }] },
        { role: 'model', parts: [{ text: text }] }
      ];

      // Trim history to keep it from getting too long (e.g., last 20 messages)
      if (newHistory.length > 20) {
        newHistory.splice(0, newHistory.length - 20);
      }

      await updateChat(chatId, { history: newHistory });

      bot.sendMessage(chatId, text);

    } catch (error) {
      console.error('Gemini API Error:', error);
      bot.sendMessage(chatId, 'Sorry, an error occurred while processing your request with NexAi.');
    }
  });

  bot.onText(/\/ai$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a prompt after the command.\nExample: `/ai Tell me a fun fact about space.`');
  });
};
