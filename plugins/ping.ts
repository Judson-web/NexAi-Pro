/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'ping';

export const initialize = (bot: TelegramBot) => {
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
