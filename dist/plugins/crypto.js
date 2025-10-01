"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'crypto_price';
const initialize = (bot) => {
    bot.onText(/\/crypto (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const coin = match ? match[1] : '';
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        bot.sendChatAction(chatId, 'typing');
        try {
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Get the current price of the cryptocurrency "${coin}" in USD. Also provide its 24-hour percentage change. Format it nicely for a Telegram message.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { tools: [{ googleSearch: {} }] }
            });
            let priceInfo = response.text || 'No price information available.';
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
                    priceInfo += `\n\n*Sources:*\n${citations}`;
                }
            }
            try {
                await bot.sendMessage(chatId, priceInfo, { disable_web_page_preview: true });
            }
            catch (sendError) {
                console.error('Failed to send message:', sendError);
                await bot.sendMessage(chatId, 'Sorry, I encountered an error while sending the crypto price information.');
            }
        }
        catch (error) {
            console.error('Crypto Price Error:', error);
            bot.sendMessage(chatId, `Sorry, an error occurred while fetching the price for ${coin}.`);
        }
    });
    bot.onText(/\/crypto$/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Please provide a cryptocurrency name or symbol.\nExample: `/crypto bitcoin`');
    });
};
exports.initialize = initialize;
