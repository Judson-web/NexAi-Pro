/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { getChat, updateChat } from '../lib/database';

export const name = 'clearchat';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/clearchat/, async (msg) => {
    const chatId = msg.chat.id;

    const chatSettings = await getChat(chatId);

    if (chatSettings && chatSettings.history && chatSettings.history.length > 0) {
      await updateChat(chatId, { history: [] });
      bot.sendMessage(chatId, 'AI conversation history has been cleared.');
    } else {
      bot.sendMessage(chatId, 'There is no AI conversation history to clear.');
    }
  });
};
