"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
exports.name = 'poll_creator';
const initialize = (bot) => {
    bot.onText(/\/poll (.+)/s, (msg, match) => {
        const chatId = msg.chat.id;
        const text = match ? match[1] : '';
        if (msg.chat.type === 'private') {
            bot.sendMessage(chatId, 'This command can only be used in groups.');
            return;
        }
        // Regex to find all strings enclosed in double quotes
        const parts = text.match(/"([^"]+)"/g);
        if (!parts || parts.length < 3) {
            bot.sendMessage(chatId, 'Invalid format. Please provide a question and at least two options in quotes.\nExample: `/poll "Favorite Color?" "Blue" "Red" "Green"`');
            return;
        }
        // Remove the quotes from the extracted parts
        const cleanedParts = parts.map(part => part.substring(1, part.length - 1));
        const question = cleanedParts[0];
        const options = cleanedParts.slice(1);
        if (options.length > 10) {
            bot.sendMessage(chatId, 'Sorry, you can only have a maximum of 10 options for a poll.');
            return;
        }
        bot.sendPoll(chatId, question, options, {
            is_anonymous: false // Can be changed to true for anonymous polls
        });
    });
    bot.onText(/\/poll$/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Please provide a question and options for the poll.\nExample: `/poll "Is this bot awesome?" "Yes!" "Definitely!"`');
    });
};
exports.initialize = initialize;
