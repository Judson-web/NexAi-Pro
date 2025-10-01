"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
const database_1 = require("../lib/database");
exports.name = 'default_ai_handler';
const initialize = (bot) => {
    bot.on('message', async (msg) => {
        // Ignore messages that are not text or are commands
        if (!msg.text || msg.text.startsWith('/')) {
            return;
        }
        const chatId = msg.chat.id;
        if (!process.env.API_KEY) {
            // Don't send a message here to avoid spamming. The owner will see errors in the log.
            console.error('AI Error: API_KEY is not configured.');
            return;
        }
        // Set status to "typing..."
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatSettings = await (0, database_1.getChat)(chatId) || { id: chatId };
            const history = chatSettings.history || [];
            const prompt = msg.text;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
                config: {
                    systemInstruction: 'You are NexAi, a helpful, creative, and friendly AI assistant. Your goal is to provide accurate, engaging, and concise information. When responding, always refer to yourself as NexAi. Be conversational and approachable.',
                    tools: [{ googleSearch: {} }],
                },
            });
            let text = response.text || 'No response generated.';
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
                    text += `\n\n*Sources:*\n${citations}`;
                }
            }
            const newHistory = [
                ...history,
                { role: 'user', parts: [{ text: prompt }] },
                { role: 'model', parts: [{ text: text }] }
            ];
            // Trim history to keep it from getting too long (e.g., last 20 messages)
            if (newHistory.length > 20) {
                newHistory.splice(0, newHistory.length - 20);
            }
            await (0, database_1.updateChat)(chatId, { history: newHistory });
            try {
                await bot.sendMessage(chatId, text, { disable_web_page_preview: true });
            }
            catch (sendError) {
                console.error('Failed to send message:', sendError);
                await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the response.');
            }
        }
        catch (error) {
            console.error('Gemini API Error:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while processing your request with NexAi.');
        }
    });
};
exports.initialize = initialize;
