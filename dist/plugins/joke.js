"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'joke';
const initialize = (bot) => {
    bot.onText(/\/joke/, async (msg) => {
        const chatId = msg.chat.id;
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Tell me a short, clever joke. It can be a one-liner or a question-answer format.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt
            });
            const joke = response.text || 'I forgot the punchline! 😅';
            bot.sendMessage(chatId, joke);
        }
        catch (error) {
            console.error('Joke Error:', error);
            bot.sendMessage(chatId, 'Sorry, I couldn\'t think of a joke right now!');
        }
    });
};
exports.initialize = initialize;
