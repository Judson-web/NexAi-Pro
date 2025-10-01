# NexAi - A Feature-Rich Telegram AI Bot

Welcome to NexAi, a powerful, modular, and intelligent Telegram bot built with Node.js, TypeScript, and powered by the Google Gemini API. NexAi is designed to be a versatile assistant, capable of everything from natural conversation and live web searches to image generation and a wide array of utility tasks.

## ✨ Core Features

- **AI by Default**: No command needed! Chat directly with NexAi for a natural, conversational experience.
- **Live Internet Access**: Powered by Google Search, NexAi can provide up-to-the-minute information on current events, people, and topics.
- **Context-Aware Conversations**: NexAi remembers the recent history of your chat to provide relevant and coherent follow-up responses.
- **Advanced Image Generation**: Create images from text with support for aspect ratios.
- **Extensive Plugin System**: A huge collection of commands for utilities, information, creative tools, and fun.
- **Group Ready**: Features custom welcome messages and group-specific commands like polls.
- **Easy Deployment**: Optimized for a quick and simple setup on Replit.

## 🚀 Deploying on Replit

Follow these steps to get your own instance of NexAi running in minutes.

### Prerequisites

1.  **Telegram Bot Token**: Get this from [@BotFather](https://t.me/BotFather) on Telegram.
2.  **Google AI API Key**: Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  **Your Telegram User ID**: Get this from a bot like [@userinfobot](https://t.me/userinfobot). This is needed for any owner-specific commands in the future.

### Step-by-Step Guide

1.  **Import Repository**:
    *   Go to [replit.com](https://replit.com).
    *   Click the **"+"** button to create a new Repl.
    *   Select **"Import from GitHub"** on the top right.
    *   Paste the URL of your bot's GitHub repository.

2.  **Configure Secrets**:
    *   Once the repository is imported, go to the **Secrets** tab (it has a padlock icon 🔒).
    *   Add the following secrets:
        *   `BOT_TOKEN`: Your Telegram Bot Token.
        *   `API_KEY`: Your Google AI (Gemini) API Key.

3.  **Run the Bot**:
    *   Simply click the big **"Run"** button at the top.
    *   Replit will automatically install all dependencies, compile the TypeScript code, and start the bot. You will see "NexAi Bot has been started..." in the console when it's ready.

4.  **Keep it Alive (24/7)**:
    *   To keep your bot running even after you close the browser, click on the name of your Repl at the top and select **"Deployments"**.
    *   Follow the on-screen instructions to set up a deployment. This will ensure your bot is always online.

## 🤖 Command Reference

Here is a complete list of commands available in NexAi.

#### General Commands
- `/start`: Show the welcome message and interactive menu.
- `/help`: Show this complete list of commands.
- `/info`: Display bot information and uptime.
- `/ping`: Check the bot's responsiveness.
- `/alive`: Check if the bot is running.

#### AI & Creative Tools
- `/ai [prompt]`: Explicitly ask the AI something (maintains conversation history).
- `/image [prompt]`: Generate an image from a text description.
  - **Advanced Options:**
    - `--ar <ratio>`: Set aspect ratio (e.g., `16:9`, `9:16`, `1:1`).
  - **Example:** `/image a knight on a horse --ar 16:9`
- `/joke`: Get a random joke.
- `/quote`: Get a random inspirational quote.
- `/recipe [dish]`: Find a recipe for a specific dish.

#### Utility Commands
- `/qr [text]`: Create a QR code.
- `/password [length]`: Generate a secure password (default length 16).
- `/calc [expression]`: Evaluate a mathematical expression.
- `/tr [lang] [text]`: Translate text (e.g., `/tr spanish Hello`).
- `/stickerid`: Reply to a sticker to get its ID.
- `/poll "[question]" "[option1]" "[option2]"`: Create a poll in a group.
- `/dice`: Roll a six-sided die.
- `/echo [message]`: I'll repeat what you say.

#### Information Commands
- `/weather [city]`: Get the current weather.
- `/crypto [coin]`: Fetch cryptocurrency prices.
- `/movie [title]`: Get information about a movie.
- `/news`: Read the latest world news headlines.
- `/wiki [query]`: Search Wikipedia.
- `/yt [query]`: Search for YouTube videos.
- `/define [word]`: Get the definition of a word.

#### Group Admin Commands
- `/setwelcome [message]`: Set a custom welcome message. Use `{name}` as a placeholder for the new member's name.
- `/clearchat`: Clear the AI's conversation history for the current chat.

## 👤 Credit

This bot was created with love by:

Credit: [VAMPIRE_KING_NO_1](https://t.me/VAMPIRE_KING_NO_1)
