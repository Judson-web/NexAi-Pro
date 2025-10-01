/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'translate';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/tr (\w+)\s(.+)/s, async (msg, match) => {
    const chatId = msg.chat.id;
    const lang = match ? match[1] : '';
    const textToTranslate = match ? match[2] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Translate the following text to ${lang}: "${textToTranslate}"`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const translatedText = response.text;
      bot.sendMessage(chatId, `*Translation to ${lang}:*\n\n${translatedText}`, { parse_mode: 'Markdown'});

    } catch (error) {
      console.error('Translation Error:', error);
      bot.sendMessage(chatId, 'Sorry, an error occurred during translation. Please check the language code and try again.');
    }
  });

  bot.onText(/\/tr$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a language code and text to translate.\nExample: `/tr spanish Hello World`');
  });
};
