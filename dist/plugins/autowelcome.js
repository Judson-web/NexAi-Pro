"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const database_1 = require("../lib/database");
exports.name = 'autowelcome';
const initialize = (bot) => {
    bot.on('new_chat_members', async (msg) => {
        const chatId = msg.chat.id;
        const newMembers = msg.new_chat_members;
        if (!newMembers || newMembers.length === 0) {
            return;
        }
        const chatSettings = await (0, database_1.getChat)(chatId);
        if (!chatSettings || !chatSettings.welcomeMessage) {
            return; // No custom welcome message set for this chat
        }
        // Fetch bot's own ID once to avoid repeated calls in the loop
        const me = await bot.getMe();
        for (const member of newMembers) {
            // Avoid welcoming the bot itself
            if (member.id === me.id) {
                continue;
            }
            const firstName = member.first_name;
            // Replace {name} placeholder with the new member's first name
            const welcomeMessage = chatSettings.welcomeMessage.replace(/{name}/g, firstName);
            bot.sendMessage(chatId, welcomeMessage);
        }
    });
};
exports.initialize = initialize;
