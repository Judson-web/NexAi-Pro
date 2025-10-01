"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'youtube_search';
const initialize = (bot) => {
    bot.onText(/\/yt (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const query = match ? match[1] : '';
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Search YouTube for "${query}" and provide a list of the top 3 most relevant video titles and their full URLs. Format the output clearly for Telegram using Markdown, like this: \n\n1. [Video Title](URL)\n2. [Video Title](URL)\n3. [Video Title](URL)`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt
            });
            const searchResults = response.text;
            bot.sendMessage(chatId, `*Top YouTube Results for "${query}":*\n\n${searchResults}`, { parse_mode: 'Markdown', disable_web_page_preview: true });
        }
        catch (error) {
            console.error('YouTube Search Error:', error);
            bot.sendMessage(chatId, `Sorry, an error occurred while searching YouTube for "${query}".`);
        }
    });
    bot.onText(/\/yt$/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Please provide a search query.\nExample: `/yt funny cat videos`');
    });
};
exports.initialize = initialize;
