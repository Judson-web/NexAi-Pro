/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { quotes } from './quotes'; // Import quotes for the button

export const name = 'start_and_help';

const helpMessage = `Here are my available commands:

*🤖 General Commands:*
/start - Show the welcome message.
/info - Display bot information and uptime.
/ping - Check the bot's latency.
/alive - Check if the bot is running.
/help - Show this message.

*✨ AI & Creative Tools:*
/ai [prompt] - Explicitly ask the AI something.
/image [prompt] - Generate an image from a text description.
  _Advanced Options:_
  \`--ar \\<ratio\\>\` - Set aspect ratio (e.g., 16:9, 9:16, 1:1).
  _Example:_ \`/image a knight on a horse --ar 16:9\`
/joke - Get a random joke.
/quote - Get a random inspirational quote.
/recipe [dish] - Find a recipe for a specific dish.

*🛠️ Utility Commands:*
/qr [text] - Create a QR code.
/password [length] - Generate a secure password (default length 16).
/calc [expression] - Evaluate a mathematical expression.
/tr [lang] [text] - Translate text. (e.g., /tr spanish Hello)
/stickerid - Reply to a sticker to get its ID.
/poll "[question]" "[option1]" "[option2]"... - Create a poll in a group.
/dice - Roll a six-sided die.
/echo [message] - I'll repeat what you say.

*🔍 Information Commands:*
/profile - Display your Telegram user information.
/weather [city] - Get the current weather.
/crypto [coin] - Fetch cryptocurrency prices.
/movie [title] - Get information about a movie.
/news - Read the latest world news headlines.
/wiki [query] - Search Wikipedia.
/yt [query] - Search for YouTube videos.
/define [word] - Get the definition of a word.

*🔧 Group Admin Commands:*
/setwelcome [message] - Set a custom welcome message. Use {name} as a placeholder.
/clearchat - Clear the AI's conversation history for this chat.

To chat with me directly, just send a message without a command!`;
    
const aboutMessage = `*About NexAi Bot*

This bot was created with love by *Judson Saji*.

Credit: [VAMPIRE_KING_NO_1](https://t.me/VAMPIRE_KING_NO_1)

I am an AI assistant powered by Google Gemini, designed to be helpful, creative, and fun.`;

export const initialize = (bot: TelegramBot) => {
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/crnn-b7d8f.appspot.com/o/files%2FGenerated%20Image%20September%2023%2C%202025%20-%2012_01PM.png?alt=media&token=4b4d45be-78a1-400f-9a9c-f49cf050c988";
  
  const startHandler = (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const startMessage = `*Welcome to NexAi Bot!* 🚀\n\nI am a multi-purpose AI assistant. How can I help you today?`;
    
    bot.sendPhoto(chatId, imageUrl, {
        caption: startMessage,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '📋 Features', callback_data: 'show_features' }, { text: '💡 Get a Quote', callback_data: 'get_quote' }],
                [{ text: '🎨 Generate Image', callback_data: 'generate_image_info' }],
                [{ text: '👤 About', callback_data: 'show_about' }]
            ]
        }
    });
  };

  bot.onText(/\/start/, startHandler);
  bot.onText(/\/help/, (msg) => bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: 'Markdown' }));

  // Handle button clicks
  bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;
    if (!msg) return;
    const chatId = msg.chat.id;

    bot.answerCallbackQuery(callbackQuery.id); // Acknowledge the button press

    if (data === 'show_features') {
        bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    } else if (data === 'get_quote') {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        bot.sendMessage(chatId, `"${randomQuote}"`);
    } else if (data === 'generate_image_info') {
        bot.sendMessage(chatId, 'To generate an image, use the command `/image` followed by your prompt.\n\n*Example:* `/image a cat sitting on a cloud --ar 16:9`');
    } else if (data === 'show_about') {
        bot.sendMessage(chatId, aboutMessage, { parse_mode: 'Markdown', disable_web_page_preview: true });
    }
  });
};