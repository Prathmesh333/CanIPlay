/**
 * Main Application Entry Point
 * Orchestrates initialization and user interactions
 */

(function () {
    'use strict';

    // ===================================
    // Theme Management
    // ===================================

    function initTheme() {
        const savedTheme = localStorage.getItem('caniplay-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (!prefersDark) {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('caniplay-theme', newTheme);
    }

    // ===================================
    // Add Custom Game Modal
    // ===================================

    function openAddGameModal() {
        const modal = document.getElementById('addGameModal');
        modal.classList.remove('hidden');
        document.getElementById('gameName').focus();
    }

    function closeAddGameModal() {
        const modal = document.getElementById('addGameModal');
        modal.classList.add('hidden');
        resetAddGameForm();
    }

    function resetAddGameForm() {
        document.getElementById('addGameForm').reset();
        const locationsContainer = document.getElementById('serverLocations');
        // Keep only one location row
        locationsContainer.innerHTML = `
            <div class="server-location-row">
                <input type="text" class="location-region" placeholder="Region (e.g., US East)" required>
                <input type="text" class="location-url" placeholder="Server URL or IP" required>
                <button type="button" class="remove-location-btn" title="Remove">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
        bindRemoveLocationButtons();
    }

    function addLocationRow() {
        const locationsContainer = document.getElementById('serverLocations');
        const newRow = document.createElement('div');
        newRow.className = 'server-location-row';
        newRow.innerHTML = `
            <input type="text" class="location-region" placeholder="Region (e.g., EU West)" required>
            <input type="text" class="location-url" placeholder="Server URL or IP" required>
            <button type="button" class="remove-location-btn" title="Remove">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;
        locationsContainer.appendChild(newRow);
        bindRemoveLocationButtons();
        newRow.querySelector('.location-region').focus();
    }

    function bindRemoveLocationButtons() {
        document.querySelectorAll('.remove-location-btn').forEach(btn => {
            btn.onclick = function () {
                const rows = document.querySelectorAll('.server-location-row');
                if (rows.length > 1) {
                    this.closest('.server-location-row').remove();
                }
            };
        });
    }

    function handleAddGameSubmit(e) {
        e.preventDefault();

        const gameName = document.getElementById('gameName').value.trim();
        const gamePublisher = document.getElementById('gamePublisher').value.trim() || 'Custom';

        // Collect all server locations
        const locationRows = document.querySelectorAll('.server-location-row');
        const servers = [];

        locationRows.forEach((row, index) => {
            const region = row.querySelector('.location-region').value.trim();
            let url = row.querySelector('.location-url').value.trim();

            if (region && url) {
                // Add protocol if missing
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }

                servers.push({
                    id: `custom-${Date.now()}-${index}`,
                    name: gameName,
                    publisher: gamePublisher,
                    region: region,
                    logo: '',
                    color: '#dc2626',
                    testEndpoint: url,
                    displayEndpoint: url.replace(/^https?:\/\//, '').split('/')[0],
                    isCustom: true,
                    customGameId: `custom-game-${Date.now()}`
                });
            }
        });

        if (servers.length === 0) {
            showNotification('Please add at least one server location', 'warning');
            return;
        }

        // Add all servers to UI
        servers.forEach(server => {
            uiController.servers.unshift(server);
        });

        // Rebuild groups and render
        uiController.groupedServers = uiController.groupServersByGame(uiController.servers);
        uiController.renderGameCards();
        uiController.populateChartSelect(uiController.servers);

        // Save to localStorage
        saveCustomServers();
        updateCustomGamesCount();

        closeAddGameModal();
        showNotification(`Added "${gameName}" with ${servers.length} server(s)`, 'success');
    }

    function updateCustomGamesCount() {
        const customServers = uiController.servers.filter(s => s.isCustom);
        const countEl = document.getElementById('customGamesCount');
        if (customServers.length > 0) {
            // Count unique custom games
            const uniqueGames = new Set(customServers.map(s => s.name));
            countEl.textContent = `${uniqueGames.size} custom game(s) saved`;
        } else {
            countEl.textContent = '';
        }
    }

    // ===================================
    // Test All Servers
    // ===================================

    async function testAllServers() {
        const testAllBtn = document.getElementById('testAllBtn');

        if (networkTester.isRunning) {
            networkTester.cancel();
            testAllBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span>Initiate Scan</span>
            `;
            return;
        }

        // Update button to show cancel option
        testAllBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="6" width="12" height="12"/>
            </svg>
            <span>Cancel Scan</span>
        `;

        // Use the built-in testAllServers with progress callback
        await networkTester.testAllServers(
            uiController.servers,
            (serverId, result, completed, total) => {
                // Update game card stats in real-time
                uiController.updateGameCardStats(serverId);
                uiController.updateStats();
            },
            true // stability test
        );

        // Reset button
        testAllBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span>Initiate Scan</span>
        `;

        // Update UI
        uiController.renderGameCards();
        uiController.updateStats();

        // Save results to localStorage
        saveResults();

        showNotification('All server tests completed!', 'success');
    }

    // ===================================
    // Notification System
    // ===================================

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles if not present
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    padding: 1rem 1.5rem;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--border-radius);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: var(--shadow-lg);
                    z-index: 1001;
                    animation: slideIn 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                .notification-success { border-left: 4px solid var(--status-success); }
                .notification-warning { border-left: 4px solid var(--status-warning); }
                .notification-error { border-left: 4px solid var(--status-danger); }
                .notification-info { border-left: 4px solid var(--status-info); }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1.25rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                }
                .notification-close:hover { color: var(--text-primary); }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // ===================================
    // Data Persistence
    // ===================================

    function saveResults() {
        const results = {};
        networkTester.results.forEach((value, key) => {
            results[key] = value;
        });

        const history = {};
        networkTester.history.forEach((value, key) => {
            history[key] = value;
        });

        localStorage.setItem('caniplay-results', JSON.stringify(results));
        localStorage.setItem('caniplay-history', JSON.stringify(history));
    }

    function loadResults() {
        try {
            const resultsStr = localStorage.getItem('caniplay-results');
            const historyStr = localStorage.getItem('caniplay-history');

            if (resultsStr) {
                const results = JSON.parse(resultsStr);
                Object.entries(results).forEach(([key, value]) => {
                    networkTester.results.set(key, value);
                });
            }

            if (historyStr) {
                const history = JSON.parse(historyStr);
                Object.entries(history).forEach(([key, value]) => {
                    networkTester.history.set(key, value);
                });
            }
        } catch (e) {
            console.warn('Failed to load saved results:', e);
        }
    }

    function loadCustomServers() {
        try {
            const customStr = localStorage.getItem('caniplay-custom-servers');
            if (customStr) {
                const customServers = JSON.parse(customStr);
                return customServers;
            }
        } catch (e) {
            console.warn('Failed to load custom servers:', e);
        }
        return [];
    }

    function saveCustomServers() {
        const customServers = uiController.servers.filter(s => s.isCustom);
        localStorage.setItem('caniplay-custom-servers', JSON.stringify(customServers));
    }

    // ===================================
    // Window Resize Handler for Chart
    // ===================================

    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (uiController.selectedServerForChart) {
                uiController.updateChart();
            }
        }, 250);
    }

    // ===================================
    // Initialization
    // ===================================

    function init() {
        try {
            // Initialize theme
            initTheme();

            // Load saved data
            loadResults();
            const customServers = loadCustomServers();

            // Merge custom servers with default
            const allServers = [...customServers, ...GAME_SERVERS];

            // Initialize UI
            uiController.init(allServers);

            // Bind event listeners
            document.getElementById('themeToggle').addEventListener('click', toggleTheme);
            document.getElementById('testAllBtn').addEventListener('click', testAllServers);

            // Add Game Modal events
            document.getElementById('addGameBtn').addEventListener('click', openAddGameModal);
            document.getElementById('closeModalBtn').addEventListener('click', closeAddGameModal);
            document.getElementById('cancelAddGame').addEventListener('click', closeAddGameModal);
            document.getElementById('addLocationBtn').addEventListener('click', addLocationRow);
            document.getElementById('addGameForm').addEventListener('submit', handleAddGameSubmit);

            // Close modal when clicking overlay
            document.querySelector('.modal-overlay')?.addEventListener('click', closeAddGameModal);

            // Bind initial remove buttons
            bindRemoveLocationButtons();

            // Update custom games count
            updateCustomGamesCount();

            // Handle window resize for chart
            window.addEventListener('resize', handleResize);

            // Save custom servers when page unloads
            window.addEventListener('beforeunload', () => {
                saveResults();
                saveCustomServers();
            });

            console.log('CanIPlay initialized');
            console.log(`📡 Loaded ${allServers.length} servers (${customServers.length} custom)`);

            // Remove loading overlay
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.style.transition = 'opacity 0.5s ease';
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
            }
        } catch (error) {
            console.error('Initialization failed:', error);
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.innerHTML += `<div style="color: #ff4444; background: rgba(0,0,0,0.8); padding: 20px; text-align: center; margin-top: 20px; border: 1px solid #ff4444; border-radius: 8px;">
                    <h3>Initialization Error</h3>
                    <p>${error.message}</p>
                </div>`;
            }
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
