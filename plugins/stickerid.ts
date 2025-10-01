/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'sticker_id';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/stickerid/, (msg) => {
    const chatId = msg.chat.id;

    if (msg.reply_to_message && msg.reply_to_message.sticker) {
      const stickerId = msg.reply_to_message.sticker.file_id;
      bot.sendMessage(chatId, `The ID for this sticker is:\n\n` + '`' + stickerId + '`', { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(chatId, 'Please reply to a sticker with this command to get its ID.');
    }
  });
};
