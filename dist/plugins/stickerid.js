"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.name = void 0;
exports.name = 'sticker_id';
const initialize = (bot) => {
    bot.onText(/\/stickerid/, (msg) => {
        const chatId = msg.chat.id;
        if (msg.reply_to_message && msg.reply_to_message.sticker) {
            const stickerId = msg.reply_to_message.sticker.file_id;
            bot.sendMessage(chatId, `The ID for this sticker is:\n\n` + '`' + stickerId + '`', { parse_mode: 'Markdown' });
        }
        else {
            bot.sendMessage(chatId, 'Please reply to a sticker with this command to get its ID.');
        }
    });
};
exports.initialize = initialize;
