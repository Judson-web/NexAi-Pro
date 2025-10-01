/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'alive';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/alive/, (msg) => {
    const chatId = msg.chat.id;
    // This command checks if the bot is running, based on the description.
    bot.sendMessage(chatId, "I'm alive and running! 🤖");
  });
};
