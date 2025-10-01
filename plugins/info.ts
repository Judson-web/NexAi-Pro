/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import * as packageJson from '../package.json';

export const name = 'info';
const startTime = new Date();

const getUptime = () => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - startTime.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    const infoMessage = `*NexAi Bot*

*Version:* ${packageJson.version}
*Uptime:* ${getUptime()}
*Powered by:* Node.js, TypeScript, and Google Gemini`;

    bot.sendMessage(chatId, infoMessage, { parse_mode: 'Markdown' });
  });
};
