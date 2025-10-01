# NexAi - Telegram AI Bot

## Overview
NexAi is a modular Telegram bot built with TypeScript and Node.js, powered by Google's Gemini AI API. It provides AI conversation, image generation, and 30+ utility commands for information, creative tools, and group management.

## Project State
- **Status**: Active development
- **Last Updated**: October 01, 2025
- **Technology Stack**: TypeScript, Node.js, Telegram Bot API, Google Gemini AI

## Architecture
- **Entry Point**: `index.ts` - Main bot initialization and plugin loader
- **Plugin System**: Modular architecture with 30+ plugins in `/plugins` directory
- **Database**: Simple chat history storage using custom DB implementation
- **Models**: Chat model for conversation tracking

## Required Secrets
- `BOT_TOKEN`: Telegram Bot Token from @BotFather
- `API_KEY`: Google AI (Gemini) API Key

## Key Features
- AI-powered conversations with context awareness
- Live internet search capabilities
- Image generation with aspect ratio support
- 30+ utility commands (weather, crypto, translate, QR codes, etc.)
- Group management features (polls, welcome messages)
- Modular plugin architecture for easy extensibility

## Project Structure
```
/plugins        - All bot command plugins
/models         - Data models (Chat)
/lib            - Utilities (database)
index.ts        - Main entry point
package.json    - Dependencies
tsconfig.json   - TypeScript config
```

## User Preferences
- None documented yet

## Recent Changes
- **2025-10-01**: Fixed TypeScript errors across all plugins, removed Markdown parsing from AI-generated content to prevent message failures, added proper error handling with try-catch blocks, successfully built and deployed bot with all 30+ plugins running
