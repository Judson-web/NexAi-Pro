/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'echo';

export const initialize = (bot: TelegramBot) => {
  // Matches "/echo [whatever]"
  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match ? match[1] : ''; // The captured "whatever"
    bot.sendMessage(chatId, resp);
  });

  // Matches "/echo" without any text
  bot.onText(/\/echo$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please provide a message to echo.\nExample: `/echo Hello`');
  });
};
