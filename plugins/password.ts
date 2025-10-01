/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'password_generator';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/password(?: (\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const length = match && match[1] ? parseInt(match[1], 10) : 16; // Default to 16 if no length is provided

    if (length < 8 || length > 128) {
        bot.sendMessage(chatId, 'Please choose a password length between 8 and 128 characters.');
        return;
    }

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // For security, it's better to send the password in a way that can be easily deleted
    // or to the user directly, but for this project, sending to the chat is acceptable.
    bot.sendMessage(chatId, `Here is your secure password:\n\n` + '`' + password + '`', { parse_mode: 'Markdown' });
  });
};
