"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
exports.name = 'echo';
const initialize = (bot) => {
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
exports.initialize = initialize;
