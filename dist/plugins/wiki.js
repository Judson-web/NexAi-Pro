"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'wikipedia';
const initialize = (bot) => {
    bot.onText(/\/wiki (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const query = match ? match[1] : '';
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Summarize the Wikipedia article for "${query}" in about 3-4 paragraphs. Start with a clear topic sentence. If the article doesn't exist or is ambiguous, state that you couldn't find a definitive article.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt
            });
            const summary = response.text || 'No Wikipedia information found.';
            try {
                await bot.sendMessage(chatId, summary);
            }
            catch (sendError) {
                console.error('Failed to send message:', sendError);
                await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the Wikipedia summary.');
            }
        }
        catch (error) {
            console.error('Wikipedia Error:', error);
            bot.sendMessage(chatId, `Sorry, an error occurred while searching Wikipedia for "${query}".`);
        }
    });
    bot.onText(/\/wiki$/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Please provide a search query.\nExample: `/wiki Albert Einstein`');
    });
};
exports.initialize = initialize;
