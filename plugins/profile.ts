/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'profile';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/profile/, (msg) => {
    const user = msg.from;
    const chatId = msg.chat.id;

    if (!user) {
      bot.sendMessage(chatId, "I couldn't get your profile information.");
      return;
    }

    let profileMessage = `*👤 Your Profile*\n\n`;
    profileMessage += `*First Name:* ${user.first_name}\n`;
    if (user.last_name) {
      profileMessage += `*Last Name:* ${user.last_name}\n`;
    }
    if (user.username) {
      profileMessage += `*Username:* @${user.username}\n`;
    }
    profileMessage += `*User ID:* \`${user.id}\``;

    bot.sendMessage(chatId, profileMessage, { parse_mode: 'Markdown' });
  });
};