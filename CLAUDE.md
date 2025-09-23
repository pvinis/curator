# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web scraping and notification service called "curator" that monitors ticket availability for events and sends push notifications when tickets become available. The application uses Playwright for web scraping with stealth mode to avoid detection, and Pushsafer for push notifications.

## Development Commands

```bash
# Install dependencies
bun install

# Run main scraping application
bun do-it
# or
node index.js

# Test notification system
bun notify-test

# Linting
bun xo
```

## Architecture

### Core Components
- `index.js` - Main application that scrapes ticket availability using Playwright
- `notify.js` - Push notification module using Pushsafer API
- `notify-test.js` - Test script for notification functionality

### Key Dependencies
- **Playwright Extra** - Web scraping with stealth mode to avoid bot detection
- **Pushsafer** - Push notification service
- **XO** - JavaScript linter with semicolon-free style

### Configuration
- Uses `mise.toml` for tool version management (bun 1, node 24)
- Environment variables required: `PUSHSAFER_KEY` (see .env.sample)
- XO linting configured without semicolons in `xo.config.js`

### Web Scraping Strategy
The application uses Playwright with puppeteer-extra stealth plugin and a Firefox user agent to scrape ticket availability. It monitors specific DOM elements and text patterns to determine if tickets are available.