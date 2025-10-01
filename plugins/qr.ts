/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import QRCode from 'qrcode';

export const name = 'qr_generator';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/qr (.+)/s, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match ? match[1] : '';

    if (!text) {
      bot.sendMessage(chatId, 'Please provide text to generate a QR code.');
      return;
    }

    try {
      const qrCodeBuffer = await QRCode.toBuffer(text, {
        errorCorrectionLevel: 'H',
        type: 'png',
        margin: 2,
        scale: 8
      });
      
      bot.sendPhoto(chatId, qrCodeBuffer, {
        caption: `QR Code for:\n"${text}"`
      });

    } catch (error) {
      console.error('QR Code Generation Error:', error);
      bot.sendMessage(chatId, 'Sorry, an error occurred while generating the QR code.');
    }
  });

  bot.onText(/\/qr$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide text to generate a QR code.\nExample: `/qr https://www.google.com`');
  });
};
