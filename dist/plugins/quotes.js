"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.quotes = exports.name = void 0;
exports.name = 'quotes';
exports.quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream bigger. Do bigger."
];
const initialize = (bot) => {
    bot.onText(/\/quote/, (msg) => {
        const chatId = msg.chat.id;
        const randomQuote = exports.quotes[Math.floor(Math.random() * exports.quotes.length)];
        bot.sendMessage(chatId, `"${randomQuote}"`);
    });
};
exports.initialize = initialize;
