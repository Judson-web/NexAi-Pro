/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'joke';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/joke/, async (msg) => {
    const chatId = msg.chat.id;

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Tell me a short, clever joke. It can be a one-liner or a question-answer format.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const joke = response.text || 'I forgot the punchline! 😅';
      bot.sendMessage(chatId, joke);

    } catch (error) {
      console.error('Joke Error:', error);
      bot.sendMessage(chatId, 'Sorry, I couldn\'t think of a joke right now!');
    }
  });
};
