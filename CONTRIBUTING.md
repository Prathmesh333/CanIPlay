# Contributing

## Adding Game Servers

Edit `js/servers.js` and add entries in this format:

```javascript
{
    id: 'game-region',
    name: 'Game Name',
    publisher: 'Publisher',
    region: 'US East',
    logo: 'https://cdn.simpleicons.org/gamename',
    color: '#hexcode',
    testEndpoint: 'https://example.com/favicon.ico',
    displayEndpoint: 'example.com'
}
```

Use favicon URLs or small images for test endpoints.

## Reporting Issues

Include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior

## Code Style

- ES6+ JavaScript
- Follow existing naming conventions
- Comment complex logic
