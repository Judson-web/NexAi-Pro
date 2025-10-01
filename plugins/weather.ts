/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'weather';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/weather (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const city = match ? match[1] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Get the current weather for ${city}. Provide the temperature in Celsius, the general condition (e.g., sunny, cloudy), humidity, and wind speed. Format it nicely for a Telegram message.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const weatherText = response.text || 'Weather information not available.';
      try {
        await bot.sendMessage(chatId, weatherText);
      } catch (sendError) {
        console.error('Failed to send message:', sendError);
        await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the weather information.');
      }

    } catch (error) {
      console.error('Weather Error:', error);
      bot.sendMessage(chatId, `Sorry, an error occurred while fetching the weather for ${city}.`);
    }
  });

  bot.onText(/\/weather$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a city name.\nExample: `/weather London`');
  });
};
