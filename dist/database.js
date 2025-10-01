"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChat = exports.getChat = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(process.cwd(), 'db.json');
let database = {};
const loadDatabase = async () => {
    try {
        const data = await promises_1.default.readFile(dbPath, 'utf-8');
        database = JSON.parse(data);
        console.log('Database loaded successfully.');
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, which is fine on the first run.
            console.log('No database file found, starting fresh.');
            database = {};
        }
        else {
            console.error('Error loading database:', error);
            database = {};
        }
    }
};
const saveDatabase = async () => {
    try {
        await promises_1.default.writeFile(dbPath, JSON.stringify(database, null, 2));
    }
    catch (error) {
        console.error('Error saving database:', error);
    }
};
// Load the database on startup
(async () => {
    await loadDatabase();
})();
const getChat = async (chatId) => {
    return database[chatId];
};
exports.getChat = getChat;
const updateChat = async (chatId, data) => {
    if (!database[chatId]) {
        database[chatId] = { id: chatId };
    }
    database[chatId] = { ...database[chatId], ...data };
    await saveDatabase();
    return database[chatId];
};
exports.updateChat = updateChat;
