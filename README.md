# <img src="icons/icon48.png" width="28" align="top"> mnurl - Short URL Generator

[English](README.md) | [中文](README_CN.md)

A Chrome extension for quickly generating short URLs via [mnurl.com](https://mnurl.com).

## Features

- **One-Click Shortening** — Generate a short URL for the current page instantly
- **Quick Copy** — Copy the generated short URL to clipboard with one click
- **History** — Browse all your created short URLs with click counts and dates, paginated
- **User Profile** — Displays your account name and plan after configuring API Key
- **Settings** — Configure and update your API Key at any time

## Install

### From Source

1. Clone this repository
   ```bash
   git clone https://github.com/HwongYeung/mnurl-chrome.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer Mode** (top right toggle)
4. Click **Load unpacked** and select the `mnurl-chrome` folder
5. The mnurl icon will appear in your browser toolbar

## Setup

1. Click the mnurl icon in the toolbar
2. Click **Go to Settings** (or the gear icon)
3. Enter your API Key — get it from [mnurl.com/api-documentation](https://mnurl.com/api-documentation)
4. Click **Save**

## Usage

### Generate Short URL

1. Navigate to any webpage
2. Click the mnurl icon
3. Click **Generate Short URL**
4. Click **Copy** to copy the result to clipboard

### View History

Click the clock icon in the header to browse all your previously created short URLs. Each entry shows:

- Short URL (with copy & open buttons)
- Original destination URL
- Click count
- Creation date

### Update API Key

Click the gear icon in the header at any time to view your account info or update your API Key.

## Tech Stack

- Chrome Extension Manifest V3
- Vanilla HTML / CSS / JavaScript
- No external dependencies
- [mnurl.com API](https://mnurl.com/api-documentation)

## Project Structure

```
mnurl-chrome/
├── manifest.json    # Extension configuration
├── popup.html       # Popup UI
├── popup.css        # Styles
├── popup.js         # Core logic
└── icons/           # Extension icons (16/32/48/128px)
```

## Permissions

| Permission | Purpose |
|---|---|
| `activeTab` | Read the current tab's URL |
| `clipboardWrite` | Copy short URLs to clipboard |
| `storage` | Persist API Key locally |
| `host_permissions` | Make API requests to mnurl.com |

## License

MIT
