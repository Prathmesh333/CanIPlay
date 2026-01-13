# 🎮 GamePing Checker

**Network Feasibility & Latency Analysis Tool for Online Gaming**

A web-based diagnostic utility that helps users on restricted networks (Enterprise/Education/Public WiFi) determine which game servers are accessible and measure their latency before investing time in game downloads.

---

## 🎯 Problem Statement

### The Challenge

Many users on **restricted networks** (corporate offices, universities, schools, public WiFi, etc.) face a frustrating problem:

> **They don't know which online games will actually work on their network until they've already downloaded massive game clients (often 50-100GB+).**

Network administrators commonly block gaming traffic, but the blocking is often inconsistent:
- Some games may be completely blocked
- Others may work fine
- Some might work partially (matchmaking blocked, but custom servers accessible)

### The Solution

**GamePing Checker** provides a **proactive solution** by testing connectivity to game servers **directly from the browser** - no downloads or installations required.

Users can:
1. **Test connectivity** to 60+ game servers across major publishers
2. **Measure latency** to determine if ping is playable
3. **Filter by region** to check servers nearest to them
4. **Add custom servers** for private/custom game servers
5. **Save results** locally for future reference

---

## ✨ Features

### 🔍 Server Connectivity Testing
- Tests 60+ game server endpoints across major publishers
- Support for Valorant, CS2, Fortnite, Apex Legends, League of Legends, Dota 2, and more
- Real-time status indicators: **Online** / **Blocked** / **Timeout**

### 📊 Latency Measurement
- HTTP-based latency estimation (approximate RTT)
- Color-coded quality indicators:
  - 🟢 **Excellent** (<50ms)
  - 💚 **Good** (50-100ms)
  - 🟡 **Acceptable** (100-150ms)
  - 🔴 **Poor** (>150ms)
- Jitter measurement for connection stability

### 🗺️ Region Filtering
- Filter servers by geographic region:
  - Americas
  - Asia Pacific
  - Europe
  - Oceania
  - Middle East
  - Global Services

### 🎮 Expandable Game Cards
- Games grouped into single expandable cards
- Click to reveal all regional server locations
- Individual per-region scan buttons
- "Scan All" button for testing all regions at once

### ➕ Custom Game Support
- Add your own games and servers
- Support for multiple server locations per game
- Persisted in local storage (survives browser restarts)

### 🌓 Theme Support
- Dark mode (Samurai-inspired theme)
- Light mode
- Preference persisted locally

### 📈 Signal Analysis Chart
- Historical latency visualization
- Per-server trend analysis
- Canvas-based rendering

---

## 🚀 Quick Start

### Option 1: Direct File Access
Simply open `index.html` in a modern web browser.

> ⚠️ Note: Some features may be limited due to CORS restrictions when opening directly from file system.

### Option 2: Local Development Server (Recommended)

```bash
# Navigate to the project directory
cd GamePingChecker

# Start a local server (choose one)
npx -y serve . -l 3000           # Using serve
python -m http.server 3000        # Using Python 3
php -S localhost:3000             # Using PHP

# Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
GamePingChecker/
├── 📄 index.html          # Main application entry point
├── 📄 README.md           # This file
├── 📂 css/
│   └── 📄 styles.css      # Complete styling (~1600 lines)
└── 📂 js/
    ├── 📄 servers.js      # Game server database (60+ servers)
    ├── 📄 tester.js       # Network testing engine
    ├── 📄 ui.js           # UI controller with grouped cards
    └── 📄 main.js         # Application orchestrator
```

---

## 🎮 Supported Games & Services

| Publisher | Games/Services |
|-----------|----------------|
| **Riot Games** | Valorant (10 regions), League of Legends (7 regions) |
| **Valve** | Counter-Strike 2 (9 regions), Dota 2 (7 regions), Steam |
| **Epic Games** | Fortnite (8 regions), Epic Games Store |
| **Electronic Arts** | Apex Legends (8 regions), EA App |
| **Blizzard** | Overwatch 2, Battle.net |
| **miHoYo** | Genshin Impact (3 regions) |
| **Microsoft** | Xbox Live, Minecraft |
| **Sony** | PlayStation Network |
| **Discord** | Voice/Chat Services |
| **Roblox** | Global Services |

---

## 🔧 Technical Details

### How It Works

Since browsers cannot perform native ICMP ping, this tool uses alternative methods:

1. **Fetch Test**: HTTP request with `mode: 'no-cors'` to measure response time
2. **Image Test**: Creates `<img>` elements for favicon/image URLs
3. **Stability Test**: Multiple probes to calculate average latency and jitter

### Limitations

- **Results are approximate**: HTTP latency includes more overhead than game UDP traffic
- **CORS restrictions**: Some servers may appear blocked due to CORS, not network restrictions
- **Protocol differences**: Actual game traffic uses different protocols (UDP, proprietary)

### Browser Requirements

- Modern browser with ES6+ support
- JavaScript enabled
- LocalStorage enabled (for persistence)

---

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:

| Key | Description |
|-----|-------------|
| `gameping-theme` | Light/Dark theme preference |
| `gameping-results` | Last test results |
| `gameping-history` | Latency history for charts |
| `gameping-custom-servers` | User-added custom games |

---

## 🤝 Contributing

Feel free to contribute by:
- Adding more game servers to `js/servers.js`
- Improving the testing methodology
- Enhancing the UI/UX
- Fixing bugs

---

## 📜 License

MIT License - Feel free to use, modify, and distribute.

---

## ⚠️ Disclaimer

This tool provides **approximate** latency measurements using HTTP-based methods. Actual in-game latency may differ due to:
- Different protocols (UDP vs HTTP)
- Game server routing optimization
- Network conditions at time of play

Use this tool as a **feasibility indicator**, not as a definitive latency measurement.

---

**Made with ❤️ for gamers on restricted networks**
