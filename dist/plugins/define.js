"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'define';
const initialize = (bot) => {
    bot.onText(/\/define (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const word = match ? match[1] : '';
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Provide a clear and concise definition for the word "${word}". Include its type (e.g., noun, verb) and an example sentence.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt
            });
            const definition = response.text;
            bot.sendMessage(chatId, `📖 *Definition for ${word}*\n\n${definition}`, { parse_mode: 'Markdown' });
        }
        catch (error) {
            console.error('Define Error:', error);
            bot.sendMessage(chatId, `Sorry, I couldn't find a definition for "${word}".`);
        }
    });
    bot.onText(/\/define$/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Please provide a word to define.\nExample: `/define serendipity`');
    });
};
exports.initialize = initialize;
