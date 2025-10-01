"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
exports.name = 'dice_roll';
const initialize = (bot) => {
    bot.onText(/\/dice/, (msg) => {
        const chatId = msg.chat.id;
        const diceEmojis = ['🎲 1', '🎲 2', '🎲 3', '🎲 4', '🎲 5', '🎲 6'];
        const roll = diceEmojis[Math.floor(Math.random() * diceEmojis.length)];
        bot.sendMessage(chatId, `You rolled: ${roll}`);
    });
};
exports.initialize = initialize;
