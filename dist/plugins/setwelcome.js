"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const database_1 = require("../lib/database");
exports.name = 'setwelcome';
const initialize = (bot) => {
    bot.onText(/\/setwelcome (.+)/s, async (msg, match) => {
        const chatId = msg.chat.id;
        const userId = msg.from?.id;
        if (!userId) {
            bot.sendMessage(chatId, "I couldn't identify the user.");
            return;
        }
        if (msg.chat.type === 'private') {
            bot.sendMessage(chatId, 'This command can only be used in groups.');
            return;
        }
        // Check if the user is an administrator
        try {
            const chatMember = await bot.getChatMember(chatId, userId);
            if (!['administrator', 'creator'].includes(chatMember.status)) {
                bot.sendMessage(chatId, 'Sorry, only administrators can set the welcome message.');
                return;
            }
        }
        catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'An error occurred while checking permissions. Make sure I am an admin in this group.');
            return;
        }
        const welcomeMessage = match ? match[1] : '';
        if (!welcomeMessage) {
            bot.sendMessage(chatId, 'Please provide a welcome message. Example: `/setwelcome Welcome, {name}!`');
            return;
        }
        await (0, database_1.updateChat)(chatId, { welcomeMessage });
        bot.sendMessage(chatId, `Welcome message has been set successfully!`);
    });
    // Handle /setwelcome without a message
    bot.onText(/\/setwelcome$/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Please provide a welcome message. Example: `/setwelcome Welcome to the group, {name}!`');
    });
};
exports.initialize = initialize;
