/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

export const name = 'movie_info';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/movie (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const title = match ? match[1] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Provide a summary for the movie "${title}". Include the release year, director, main cast, and a brief plot summary. Format it nicely for a Telegram message.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
      });

      let movieInfo = response.text || 'No movie information available.';

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks && groundingChunks.length > 0) {
        const citations = groundingChunks
          .map((chunk, index) => {
            const title = chunk.web?.title || chunk.web?.uri || 'Source';
            const uri = chunk.web?.uri;
            if (uri) {
              const sanitizedTitle = title.replace(/\[/g, '(').replace(/\]/g, ')');
              return `${index + 1}. [${sanitizedTitle}](${uri})`;
            }
            return null;
          })
          .filter(Boolean)
          .join('\n');
          
        if (citations) {
            movieInfo += `\n\n*Sources:*\n${citations}`;
        }
      }

      try {
        await bot.sendMessage(chatId, movieInfo, { disable_web_page_preview: true });
      } catch (sendError) {
        console.error('Failed to send message:', sendError);
        await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the movie information.');
      }

    } catch (error) {
      console.error('Movie Info Error:', error);
      bot.sendMessage(chatId, `Sorry, an error occurred while searching for the movie "${title}".`);
    }
  });

  bot.onText(/\/movie$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a movie title.\nExample: `/movie Inception`');
  });
};