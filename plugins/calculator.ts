/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'calculator';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/calc (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const expression = match ? match[1] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Calculate the following mathematical expression and provide only the final numerical answer, without any extra text or explanation: ${expression}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const result = (response.text || 'No result').trim();
      try {
        await bot.sendMessage(chatId, `🧮 The result is: ${result}`);
      } catch (sendError) {
        console.error('Failed to send message:', sendError);
        await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the calculation result.');
      }

    } catch (error) {
      console.error('Calculator Error:', error);
      bot.sendMessage(chatId, 'Sorry, I couldn\'t calculate that. Please check your expression.');
    }
  });

  bot.onText(/\/calc$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a mathematical expression.\nExample: `/calc (5 + 3) * 2`');
  });
};
