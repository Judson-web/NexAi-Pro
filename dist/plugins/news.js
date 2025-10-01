"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'news';
const initialize = (bot) => {
    bot.onText(/\/news/, async (msg) => {
        const chatId = msg.chat.id;
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Get the top 3 latest world news headlines. For each headline, provide a one-sentence summary and a source link if available.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { tools: [{ googleSearch: {} }] }
            });
            let news = response.text || 'No news available at the moment.';
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
                    // Check if sources are already in the main text to avoid duplication
                    if (!news.includes(citations.substring(0, 20))) {
                        news += `\n\n*Sources:*\n${citations}`;
                    }
                }
            }
            try {
                await bot.sendMessage(chatId, `📰 Latest World News\n\n${news}`, { disable_web_page_preview: true });
            }
            catch (sendError) {
                console.error('Failed to send message:', sendError);
                await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the news.');
            }
        }
        catch (error) {
            console.error('News Error:', error);
            bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the latest news.');
        }
    });
};
exports.initialize = initialize;
