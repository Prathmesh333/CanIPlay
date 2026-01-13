# Contributing to GamePing Checker

Thank you for your interest in contributing! Here's how you can help:

## 🎮 Adding New Game Servers

The easiest way to contribute is by adding new game servers to the database.

### Steps:

1. Edit `js/servers.js`
2. Add a new server entry following this format:

```javascript
{
    id: 'game-region',           // Unique ID (lowercase, hyphenated)
    name: 'Game Name',           // Display name
    publisher: 'Publisher Name', // Company name
    region: 'Region Name',       // e.g., 'US East', 'Europe', 'Asia'
    logo: 'https://...',         // Logo URL (use Simple Icons CDN if available)
    color: '#hexcode',           // Brand color for UI accents
    testEndpoint: 'https://...', // Actual URL to test (favicon or small image works best)
    displayEndpoint: 'server.example.com'  // Human-readable endpoint
}
```

### Tips for Test Endpoints:

- Use favicon URLs: `https://example.com/favicon.ico`
- Use small static images (faster tests)
- Avoid endpoints that require authentication
- Test that the endpoint is accessible before submitting

## 🐛 Reporting Bugs

Open an issue with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Feature Suggestions

Open an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## 🔧 Code Contributions

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

### Code Style:

- Use ES6+ JavaScript features
- Follow existing naming conventions
- Add comments for complex logic
- Keep CSS organized by section

## 📝 Documentation

Help improve documentation by:
- Fixing typos
- Adding examples
- Clarifying confusing sections
- Translating to other languages

---

Thank you for making GamePing Checker better! 🎮
