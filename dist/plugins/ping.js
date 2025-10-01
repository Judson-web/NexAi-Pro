"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
exports.name = 'ping';
const initialize = (bot) => {
    bot.onText(/\/ping/, async (msg) => {
        const chatId = msg.chat.id;
        const startTime = Date.now();
        const sentMessage = await bot.sendMessage(chatId, '🏓 Pinging...');
        const endTime = Date.now();
        const latency = endTime - startTime;
        bot.editMessageText(`*Pong!* 🏓\n\nLatency: ${latency}ms`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: 'Markdown'
        });
    });
};
exports.initialize = initialize;
