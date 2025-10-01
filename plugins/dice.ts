/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'dice_roll';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/dice/, (msg) => {
    const chatId = msg.chat.id;
    const diceEmojis = ['🎲 1', '🎲 2', '🎲 3', '🎲 4', '🎲 5', '🎲 6'];
    const roll = diceEmojis[Math.floor(Math.random() * diceEmojis.length)];
    bot.sendMessage(chatId, `You rolled: ${roll}`);
  });
};
