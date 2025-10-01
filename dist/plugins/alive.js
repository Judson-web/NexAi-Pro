"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
exports.name = 'alive';
const initialize = (bot) => {
    bot.onText(/\/alive/, (msg) => {
        const chatId = msg.chat.id;
        // This command checks if the bot is running, based on the description.
        bot.sendMessage(chatId, "I'm alive and running! 🤖");
    });
};
exports.initialize = initialize;
