"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
const database_1 = require("../lib/database");
exports.name = 'clearchat';
const initialize = (bot) => {
    bot.onText(/\/clearchat/, async (msg) => {
        const chatId = msg.chat.id;
        const chatSettings = await (0, database_1.getChat)(chatId);
        if (chatSettings && chatSettings.history && chatSettings.history.length > 0) {
            await (0, database_1.updateChat)(chatId, { history: [] });
            bot.sendMessage(chatId, 'AI conversation history has been cleared.');
        }
        else {
            bot.sendMessage(chatId, 'There is no AI conversation history to clear.');
        }
    });
};
exports.initialize = initialize;
