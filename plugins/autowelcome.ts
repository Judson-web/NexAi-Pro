/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { getChat } from '../lib/database';

export const name = 'autowelcome';

export const initialize = (bot: TelegramBot) => {
  bot.on('new_chat_members', async (msg) => {
    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;

    if (!newMembers || newMembers.length === 0) {
      return;
    }

    const chatSettings = await getChat(chatId);
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
