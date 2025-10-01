"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const genai_1 = require("@google/genai");
exports.name = 'image_generator';
const initialize = (bot) => {
    bot.onText(/\/image (.+)/s, async (msg, match) => {
        const chatId = msg.chat.id;
        const fullPrompt = match ? match[1] : '';
        if (!fullPrompt) {
            bot.sendMessage(chatId, 'Please provide a prompt for the image. Example: `/image a cat sitting on a cloud --ar 16:9`');
            return;
        }
        if (!process.env.API_KEY) {
            bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
            return;
        }
        const thinkingMessage = await bot.sendMessage(chatId, '🎨 Generating your image, please wait...');
        bot.sendChatAction(chatId, 'upload_photo');
        try {
            // Argument parsing
            let prompt = fullPrompt;
            let aspectRatio = '1:1';
            const supportedAspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];
            // Regex to parse arguments
            const arMatch = prompt.match(/--ar\s+([^\s]+)/);
            if (arMatch && arMatch[1] && supportedAspectRatios.includes(arMatch[1])) {
                aspectRatio = arMatch[1];
                prompt = prompt.replace(arMatch[0], '').trim();
            }
            const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: aspectRatio,
                },
            });
            const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
            if (!base64ImageBytes) {
                throw new Error('No image data returned');
            }
            const imageBuffer = Buffer.from(base64ImageBytes, 'base64');
            await bot.sendPhoto(chatId, imageBuffer, {
                caption: `Here is the image for:\n"${prompt}"`
            });
            // Delete the "generating" message
            bot.deleteMessage(chatId, thinkingMessage.message_id);
        }
        catch (error) {
            console.error('Image Generation Error:', error);
            bot.editMessageText('Sorry, an error occurred while generating the image. The prompt may have been rejected.', {
                chat_id: chatId,
                message_id: thinkingMessage.message_id
            });
        }
    });
    bot.onText(/\/image$/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Please provide a prompt to generate an image.\nExample: `/image a majestic lion in the savanna`');
    });
};
exports.initialize = initialize;
