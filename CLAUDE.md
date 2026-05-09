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
- **Settings View** — API Key input (stored in `chrome.storage.local`), user profile card, language selector
- **History View** — Paginated list from `GET /api/links/`, filtered to `type === "link"`, with copy/open/delete actions

**Files:**
- `popup.html` — Single HTML page, all three views live here
- `popup.js` — All logic: state management, API calls, DOM manipulation, event handling
- `popup.css` — All styles
- `i18n.js` — Runtime i18n with translation dictionary (6 languages: en, zh-CN, zh-HK, ja, ko, de)
- `_locales/` — Chrome manifest-level i18n (extension name/description only)

**State is managed through module-level variables** in `popup.js`: `currentView`, `apiToken`, `historyPage`, `allFilteredLinks`, etc.

**i18n approach:** `i18n.js` contains a `messages` object with all translations. The `t(key, params)` function handles interpolation. DOM elements use `data-i18n`, `data-i18n-placeholder`, and `data-i18n-title` attributes for static text. Dynamic text is refreshed via `refreshDynamicTexts()` on language switch.

## API Integration (mnurl.com)

All requests use `Authorization: Bearer {apiToken}` header. Base URL: `https://mnurl.com/api/`

**Short URL creation is a 2-step process:**
1. `POST /api/links` with `location_url` and `domain_id=2` (multipart/form-data) → returns `link_id`
2. `GET /api/links/{link_id}` → returns `url` field (the actual slug)
3. Final short URL: `https://mnurl.com/{slug}`

The POST does not directly return the usable short URL slug — the GET is required.

**Other endpoints:**
- `GET /api/links/?page=N&results_per_page=25` — paginated link list (history)
- `GET /api/user` — user profile (name, email, plan info, limits)
- `DELETE /api/links/{link_id}` — delete a link

## Critical API Gotchas

- **`domain_id=2` is required** on POST `/api/links`. Without it, API returns 401 "You are not allowed to use the main domain creating links." `domain_id=0` and `domain_id=1` do not work correctly — only `domain_id=2` produces accessible short links.
- **Pagination `meta.page` returns as a string** — must `parseInt()` before arithmetic.
- **Before creating a link**, the code searches existing history to avoid duplicates (`findExistingShortUrl`).

## Key Design Decisions

- API Key stored in `chrome.storage.local` under key `mnurl_api_key` — no default key shipped
- Clipboard: tries `navigator.clipboard.writeText()` first, falls back to `execCommand('copy')`
- Browser internal pages (`chrome://`, `edge://`, `about:`) are detected and blocked from shortening
- History filtering happens client-side (API returns all link types; we filter `type === "link"`)
- History has a 5-minute cache in `chrome.storage.local` to avoid repeated API calls
- User info loads silently on startup — failures don't block the UI
- Delete action uses `confirm()` dialog then removes item with CSS animation

## Theming

Teal/cyan color scheme matching mnurl.com branding. Primary color: `#06b6d4`. Light background (`#f8fafb`), white cards. Danger/delete actions use `#ef4444`.
