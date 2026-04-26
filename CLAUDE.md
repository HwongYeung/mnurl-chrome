# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chrome extension (Manifest V3) that generates short URLs via the mnurl.com API. Pure vanilla HTML/CSS/JS — no build tools, no dependencies, no bundling.

## Development

**Install for development:**
1. Open `chrome://extensions/`
2. Enable Developer Mode
3. Click "Load unpacked" and select the project directory
4. After code changes, click the refresh icon on the extension card

There are no build, lint, or test commands — the extension loads directly from source files.

## Architecture

Single-page popup app with three views toggled by `.hidden` class:

- **Main View** — Shows current tab URL, generates short URLs
- **Settings View** — API Key input (stored in `chrome.storage.local`), user profile card
- **History View** — Paginated list from `GET /api/links/`, filtered to `type === "link"`

**State is managed through module-level variables** in `popup.js`: `currentView`, `apiToken`, `historyPage`, etc.

## API Integration (mnurl.com)

All requests use `Authorization: Bearer {apiToken}` header. Base URL: `https://mnurl.com/api/`

**Short URL creation is a 2-step process:**
1. `POST /api/links` with `location_url` (multipart/form-data) → returns `link_id` (numeric ID)
2. `GET /api/links/{link_id}` → returns `url` field (the actual slug)
3. Final short URL: `https://mnurl.com/{slug}`

The POST does not directly return the usable short URL slug — the GET is required.

**Other endpoints:**
- `GET /api/links/?page=N&results_per_page=25` — paginated link list (history)
- `GET /api/user` — user profile (name from `billing.name`, plan from `billing.plan_id`)

**Gotcha:** API pagination `meta.page` returns as a string, must `parseInt()` before arithmetic.

## Key Design Decisions

- API Key stored in `chrome.storage.local` under key `mnurl_api_key` — no default key shipped
- Clipboard: tries `navigator.clipboard.writeText()` first, falls back to `execCommand('copy')`
- Browser internal pages (`chrome://`, `edge://`, `about:`) are detected and blocked from shortening
- History filtering happens client-side (API returns all link types; we filter `type === "link"`)
- User info loads silently on startup — failures don't block the UI

## Theming

Teal/cyan color scheme matching mnurl.com branding. Primary color: `#06b6d4`. Light background (`#f8fafb`), white cards. Icon sourced from `https://mnurl.com/uploads/main/c667ac81a4efc1fda04abe231dbc2779.png`.
