"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
console.log('NexAi Bot has been started...');
const pluginsDir = path_1.default.join(__dirname, 'plugins');
// This robustly determines the file extension to look for.
// It will be '.ts' when running with ts-node (development) 
// and '.js' when running the compiled code from /dist (production).
const fileExtension = path_1.default.extname(__filename);
fs_1.default.readdirSync(pluginsDir).forEach(file => {
    if (file.endsWith(fileExtension)) {
        const pluginPath = path_1.default.join(pluginsDir, file);
        try {
            // Dynamically require plugin files
            const plugin = require(pluginPath);
            if (plugin && typeof plugin.initialize === 'function') {
                plugin.initialize(bot);
                console.log(`Loaded plugin: ${plugin.name}`);
            }
        }
        catch (error) {
            console.error(`Error loading plugin from ${file}:`, error);
        }
    }
});
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});
console.log('All plugins loaded. Bot is running.');
