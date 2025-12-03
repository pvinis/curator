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

# Test notification system
bun notify-test
```

## Architecture

### Project Structure

```
src/
├── index.ts       # Main orchestration
├── browser.ts     # Playwright setup and page fetching
├── scanners.ts    # Ticket availability checking functions
├── notify.ts      # Push notification module
├── notify-test.ts # Test script for notifications
└── types.ts       # Shared TypeScript interfaces
```

### Key Dependencies

- **Playwright Extra** - Web scraping with stealth mode to avoid bot detection
- **Pushsafer** - Push notification service
- **Bun** - Runtime and package manager

### Configuration

- Uses `mise.toml` for tool version management
- Environment variables required: `PUSHSAFER_KEY` (see .env.sample)
- TypeScript with Bun types

### Web Scraping Strategy

The application uses Playwright with puppeteer-extra stealth plugin and a Firefox user agent to scrape ticket availability. It monitors specific DOM elements and text patterns to determine if tickets are available.
