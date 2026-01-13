# GamePing Checker

A browser-based tool to test game server connectivity and latency from restricted networks.

## Problem

Users on corporate, university, or public networks often can't tell which online games will work until after downloading large game clients (50-100GB+). Network restrictions are inconsistent - some games work, others don't.

This tool lets you test connectivity to game servers directly from your browser before committing to downloads.

## Features

- **Server Testing** - Tests 60+ game servers across major publishers (Riot, Valve, Epic, EA, Blizzard, etc.)
- **Latency Measurement** - HTTP-based RTT estimation with jitter calculation
- **Region Filtering** - Filter by Americas, Europe, Asia Pacific, Oceania, Middle East
- **Custom Games** - Add your own servers, persisted in localStorage
- **Expandable Cards** - One card per game, click to see all regional servers
- **Theme Support** - Dark and light modes

## Quick Start

```bash
# Start a local server
cd GamePingChecker
npx serve . -l 3000

# Open http://localhost:3000
```

Or just open `index.html` directly (some features may be limited due to CORS).

## Project Structure

```
GamePingChecker/
├── index.html
├── css/styles.css
└── js/
    ├── servers.js    # Server database
    ├── tester.js     # Network testing logic
    ├── ui.js         # UI rendering
    └── main.js       # App initialization
```

## Supported Games

| Publisher | Games |
|-----------|-------|
| Riot Games | Valorant, League of Legends |
| Valve | CS2, Dota 2, Steam |
| Epic Games | Fortnite, Epic Store |
| EA | Apex Legends |
| Blizzard | Overwatch 2, Battle.net |
| Others | Genshin Impact, Minecraft, Roblox, Discord, Xbox Live, PSN |

## Technical Notes

**How it works:** Since browsers can't do ICMP ping, this tool uses HTTP fetch requests and image loading to estimate latency.

**Limitations:**
- Results are approximate (HTTP overhead vs actual game UDP traffic)
- Some servers may appear blocked due to CORS, not network restrictions
- Actual in-game latency will differ

## Data Storage

All data stored locally in browser localStorage:
- Theme preference
- Test results and history
- Custom servers

## License

MIT
