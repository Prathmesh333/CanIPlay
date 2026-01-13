# CanIPlay

**Live Demo:** [https://caniplay-web.web.app](https://caniplay-web.web.app)

Test game server connectivity and latency from restricted networks before downloading.

## Problem

Users on corporate, university, or public networks often can't tell which online games will work until after downloading large game clients (50-100GB+). Network restrictions are inconsistent - some games work, others don't.

**CanIPlay** lets you test connectivity to game servers directly from your browser before committing to downloads.

## Features

- **Server Testing** - Tests 60+ game servers (Riot, Valve, Epic, EA, Blizzard, etc.)
- **Latency Measurement** - HTTP-based RTT estimation with jitter calculation
- **Region Filtering** - Filter by Americas, Europe, Asia Pacific, Oceania, Middle East
- **Custom Games** - Add your own servers, persisted in localStorage
- **Expandable Cards** - One card per game, click to see all regional servers
- **Theme Support** - Dark and light modes

## Quick Start

```bash
cd CanIPlay
npx serve . -l 3000
# Open http://localhost:3000
```

Or open `index.html` directly.

## Project Structure

```
CanIPlay/
├── index.html
├── css/styles.css
└── js/
    ├── servers.js
    ├── tester.js
    ├── ui.js
    └── main.js
```

## Supported Games

| Publisher | Games |
|-----------|-------|
| Riot Games | Valorant, League of Legends |
| Valve | CS2, Dota 2, Steam |
| Epic Games | Fortnite |
| EA | Apex Legends |
| Blizzard | Overwatch 2 |
| Others | Genshin Impact, Minecraft, Roblox, Discord, Xbox Live, PSN |

## Technical Notes

Uses HTTP fetch requests and image loading to estimate latency (browsers can't do ICMP ping).

Results are approximate - actual in-game latency will differ.

## License

MIT
