/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import dotenv from 'dotenv';
dotenv.config();

import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';

// Plugin interface
interface Plugin {
  name: string;
  initialize: (bot: TelegramBot) => void;
}

const token = process.env.BOT_TOKEN;
const apiKey = process.env.API_KEY;

if (!token) {
  console.error('Error: BOT_TOKEN is not configured in your environment.');
  process.exit(1);
}

if (!apiKey) {
  console.error('Error: API_KEY is not configured in your environment.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
console.log('NexAi Bot has been started...');

const pluginsDir = path.join(__dirname, 'plugins');

// This robustly determines the file extension to look for.
// It will be '.ts' when running with ts-node (development) 
// and '.js' when running the compiled code from /dist (production).
const fileExtension = path.extname(__filename); 

fs.readdirSync(pluginsDir).forEach(file => {
  if (file.endsWith(fileExtension)) {
    const pluginPath = path.join(pluginsDir, file);
    try {
      // Dynamically require plugin files
      const plugin: Plugin = require(pluginPath);
      if (plugin && typeof plugin.initialize === 'function') {
        plugin.initialize(bot);
        console.log(`Loaded plugin: ${plugin.name}`);
      }
    } catch (error) {
      console.error(`Error loading plugin from ${file}:`, error);
    }
  }
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('All plugins loaded. Bot is running.');
