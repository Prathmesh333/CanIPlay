/**
 * UI Controller
 * Handles rendering and user interactions
 * Grouped Game Cards with Expandable Server Locations
 */

class UIController {
    constructor() {
        this.currentFilter = 'all';
        this.currentRegion = 'all';
        this.searchQuery = '';
        this.servers = [];
        this.groupedServers = {};
        this.expandedGames = new Set();
        this.chartInstance = null;
        this.selectedServerForChart = null;
    }

    /**
     * Initialize UI components
     * @param {Array} servers - Server database
     */
    init(servers) {
        this.servers = servers;
        this.groupedServers = this.groupServersByGame(servers);
        this.renderRegionTabs(servers);
        this.renderGameCards();
        this.updateStats();
        this.populateChartSelect(servers);
        this.bindEvents();
    }

    /**
     * Group servers by game name
     * @param {Array} servers - Server list
     * @returns {Object} Grouped servers
     */
    groupServersByGame(servers) {
        const grouped = {};
        servers.forEach(server => {
            const key = `${server.name}-${server.publisher}`;
            if (!grouped[key]) {
                grouped[key] = {
                    name: server.name,
                    publisher: server.publisher,
                    logo: server.logo,
                    color: server.color,
                    servers: []
                };
            }
            grouped[key].servers.push(server);
        });
        return grouped;
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.closest('.filter-tab').dataset.filter);
            });
        });

        // Region tabs
        document.getElementById('regionTabs')?.addEventListener('click', (e) => {
            const regionBtn = e.target.closest('.region-btn');
            if (regionBtn) {
                this.setActiveRegion(regionBtn.dataset.region);
            }
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderGameCards();
        });

        // Chart server select
        const chartSelect = document.getElementById('chartServerSelect');
        chartSelect.addEventListener('change', (e) => {
            this.selectedServerForChart = e.target.value;
            this.updateChart();
        });
    }

    /**
     * Extract unique regions from servers
     */
    getUniqueRegions(servers) {
        const regions = new Set();
        servers.forEach(server => {
            const region = server.region.toLowerCase();
            if (region.includes('asia') || region.includes('apac') || region.includes('singapore') ||
                region.includes('mumbai') || region.includes('tokyo') || region.includes('japan') ||
                region.includes('seoul') || region.includes('korea') || region.includes('hong kong') ||
                region.includes('india') || region.includes('southeast')) {
                regions.add('Asia Pacific');
            } else if (region.includes('europe') || region.includes('eu ') || region.includes('eu-') ||
                region.includes('amsterdam') || region.includes('frankfurt') || region.includes('london') ||
                region.includes('paris') || region.includes('stockholm') || region.includes('russia')) {
                regions.add('Europe');
            } else if (region.includes('america') || region.includes('na ') || region.includes('na-') ||
                region.includes('us ') || region.includes('us-') || region.includes('chicago') ||
                region.includes('virginia') || region.includes('oregon') || region.includes('brazil') ||
                region.includes('texas')) {
                regions.add('Americas');
            } else if (region.includes('oceania') || region.includes('australia') || region.includes('sydney')) {
                regions.add('Oceania');
            } else if (region.includes('middle east') || region.includes('bahrain')) {
                regions.add('Middle East');
            } else if (region.includes('global') || region.includes('cdn')) {
                regions.add('Global');
            } else {
                regions.add('Other');
            }
        });
        return ['all', ...Array.from(regions).sort()];
    }

    /**
     * Render region filter tabs
     */
    renderRegionTabs(servers) {
        const regions = this.getUniqueRegions(servers);
        const container = document.getElementById('regionTabs');
        if (!container) return;

        container.innerHTML = regions.map(region => `
            <button class="region-btn ${region === 'all' ? 'active' : ''}" data-region="${region}">
                ${region === 'all' ? 'All Regions' : region}
            </button>
        `).join('');
    }

    /**
     * Set active region filter
     */
    setActiveRegion(region) {
        this.currentRegion = region;
        document.querySelectorAll('.region-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.region === region);
        });
        this.renderGameCards();
    }

    /**
     * Set active filter tab
     */
    setActiveFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        this.renderGameCards();
    }

    /**
     * Check if server matches region filter
     */
    matchesRegion(server, regionFilter) {
        if (regionFilter === 'all') return true;
        const region = server.region.toLowerCase();

        switch (regionFilter) {
            case 'Asia Pacific':
                return region.includes('asia') || region.includes('apac') ||
                    region.includes('singapore') || region.includes('mumbai') ||
                    region.includes('tokyo') || region.includes('japan') ||
                    region.includes('korea') || region.includes('india') ||
                    region.includes('seoul') || region.includes('hong kong') ||
                    region.includes('southeast');
            case 'Europe':
                return region.includes('europe') || region.includes('eu ') || region.includes('eu-') ||
                    region.includes('amsterdam') || region.includes('frankfurt') ||
                    region.includes('london') || region.includes('paris') ||
                    region.includes('stockholm') || region.includes('russia');
            case 'Americas':
                return region.includes('america') || region.includes('na ') || region.includes('na-') ||
                    region.includes('us ') || region.includes('us-') ||
                    region.includes('chicago') || region.includes('virginia') || region.includes('oregon') ||
                    region.includes('brazil') || region.includes('texas');
            case 'Oceania':
                return region.includes('oceania') || region.includes('australia') || region.includes('sydney');
            case 'Middle East':
                return region.includes('middle east') || region.includes('bahrain');
            case 'Global':
                return region.includes('global') || region.includes('cdn');
            default:
                return true;
        }
    }

    /**
     * Get filtered game groups
     */
    getFilteredGroups() {
        const filtered = {};

        Object.entries(this.groupedServers).forEach(([key, group]) => {
            // Filter servers within group by region
            let filteredServers = group.servers;

            if (this.currentRegion !== 'all') {
                filteredServers = group.servers.filter(s => this.matchesRegion(s, this.currentRegion));
            }

            // Filter by status
            if (this.currentFilter !== 'all') {
                filteredServers = filteredServers.filter(server => {
                    const result = networkTester.getResult(server.id);
                    if (!result) return false;
                    if (this.currentFilter === 'playable') return result.status === 'reachable';
                    if (this.currentFilter === 'blocked') return result.status === 'blocked' || result.status === 'timeout';
                    return true;
                });
            }

            // Filter by search
            if (this.searchQuery) {
                const matchesSearch = group.name.toLowerCase().includes(this.searchQuery) ||
                    group.publisher.toLowerCase().includes(this.searchQuery);
                if (!matchesSearch) filteredServers = [];
            }

            if (filteredServers.length > 0) {
                filtered[key] = { ...group, servers: filteredServers };
            }
        });

        return filtered;
    }

    /**
     * Render game cards (grouped)
     */
    renderGameCards() {
        const grid = document.getElementById('serversGrid');
        const filteredGroups = this.getFilteredGroups();

        if (Object.keys(filteredGroups).length === 0) {
            grid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 64px; height: 64px; margin-bottom: 1rem; opacity: 0.3; color: var(--accent-primary);">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                    <p style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em;">No games found</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = Object.entries(filteredGroups).map(([key, group]) =>
            this.createGameCard(key, group)
        ).join('');

        // Bind click events
        this.bindCardEvents();
    }

    /**
     * Bind card interaction events
     */
    bindCardEvents() {
        const grid = document.getElementById('serversGrid');

        // Game card header clicks (expand/collapse)
        grid.querySelectorAll('.game-card-header').forEach(header => {
            header.addEventListener('click', (e) => {
                if (e.target.closest('.scan-all-btn')) return;
                const gameKey = header.closest('.game-card').dataset.gameKey;
                this.toggleGameExpand(gameKey);
            });
        });

        // Scan All button
        grid.querySelectorAll('.scan-all-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const gameKey = btn.closest('.game-card').dataset.gameKey;
                this.scanAllServers(gameKey);
            });
        });

        // Individual server scan buttons
        grid.querySelectorAll('.server-row-scan').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const serverId = btn.dataset.serverId;
                this.scanSingleServer(serverId);
            });
        });

        // Handle logo errors
        grid.querySelectorAll('.game-logo').forEach(img => {
            img.addEventListener('error', function () {
                this.style.display = 'none';
                if (this.nextElementSibling) this.nextElementSibling.style.display = 'flex';
            });
        });
    }

    /**
     * Create HTML for a game card
     */
    createGameCard(key, group) {
        const isExpanded = this.expandedGames.has(key);
        const servers = group.servers;

        // Calculate aggregate stats
        const results = servers.map(s => networkTester.getResult(s.id)).filter(r => r);
        const reachableCount = results.filter(r => r.status === 'reachable').length;
        const testedCount = results.length;
        const latencies = results.filter(r => r.latency).map(r => r.latency);
        const bestPing = latencies.length > 0 ? Math.min(...latencies) : null;

        // Determine overall status
        let overallStatus = 'pending';
        if (testedCount > 0) {
            if (reachableCount === testedCount) overallStatus = 'reachable';
            else if (reachableCount > 0) overallStatus = 'partial';
            else overallStatus = 'blocked';
        }

        const statusLabels = {
            pending: 'Not Tested',
            reachable: 'All Online',
            partial: `${reachableCount}/${testedCount} Online`,
            blocked: 'Blocked'
        };

        return `
            <div class="game-card ${isExpanded ? 'expanded' : ''} status-${overallStatus}" data-game-key="${key}">
                <div class="game-card-header">
                    <div class="game-info">
                        <div class="game-icon" style="border-color: ${group.color}40;">
                            <img src="${group.logo}" alt="${group.name}" class="game-logo">
                            <span class="fallback-icon" style="display: none;">🎮</span>
                        </div>
                        <div class="game-details">
                            <h3>${group.name}</h3>
                            <span class="game-publisher">${group.publisher}</span>
                        </div>
                    </div>
                    <div class="game-stats">
                        <div class="game-ping ${bestPing ? NetworkTester.getLatencyQuality(bestPing) : ''}">
                            ${bestPing ? `${bestPing}ms` : '--'}
                            <span class="ping-label">Best</span>
                        </div>
                        <div class="game-status status-${overallStatus}">
                            <span class="status-dot"></span>
                            ${statusLabels[overallStatus]}
                        </div>
                        <button class="scan-all-btn" title="Scan all regions">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="23 4 23 10 17 10"/>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                            </svg>
                        </button>
                        <div class="expand-indicator">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                            <span class="server-count">${servers.length} regions</span>
                        </div>
                    </div>
                </div>
                <div class="game-servers-list">
                    <div class="servers-table">
                        <div class="servers-table-header">
                            <span>Region</span>
                            <span>Latency</span>
                            <span>Jitter</span>
                            <span>Status</span>
                            <span></span>
                        </div>
                        ${servers.map(server => this.createServerRow(server)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create HTML for a server row
     */
    createServerRow(server) {
        const result = networkTester.getResult(server.id);
        const status = result ? result.status : 'pending';
        const latency = result?.latency;
        const jitter = result?.jitter;
        const latencyQuality = latency ? NetworkTester.getLatencyQuality(latency) : '';

        const statusInfo = {
            reachable: { label: 'Online', class: 'online' },
            blocked: { label: 'Blocked', class: 'blocked' },
            timeout: { label: 'Timeout', class: 'blocked' },
            pending: { label: 'Pending', class: 'pending' },
            testing: { label: 'Testing...', class: 'testing' }
        };

        const info = statusInfo[status] || statusInfo.pending;

        return `
            <div class="server-row" data-server-id="${server.id}">
                <span class="server-region">
                    <span class="region-dot" style="background: ${server.color}"></span>
                    ${server.region}
                    <span class="region-location">${server.displayEndpoint}</span>
                </span>
                <span class="server-latency ${latencyQuality}">${latency ? `${latency}ms` : '--'}</span>
                <span class="server-jitter">${jitter !== undefined && jitter !== null ? `±${jitter}ms` : '--'}</span>
                <span class="server-status-badge ${info.class}">
                    <span class="status-indicator"></span>
                    ${info.label}
                </span>
                <button class="server-row-scan" data-server-id="${server.id}" title="Scan this region">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"/>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                </button>
            </div>
        `;
    }

    /**
     * Toggle game card expansion
     */
    toggleGameExpand(gameKey) {
        if (this.expandedGames.has(gameKey)) {
            this.expandedGames.delete(gameKey);
        } else {
            this.expandedGames.add(gameKey);
        }

        const card = document.querySelector(`.game-card[data-game-key="${gameKey}"]`);
        if (card) {
            card.classList.toggle('expanded', this.expandedGames.has(gameKey));
        }
    }

    /**
     * Scan all servers for a game
     */
    async scanAllServers(gameKey) {
        const group = this.groupedServers[gameKey];
        if (!group) return;

        const btn = document.querySelector(`.game-card[data-game-key="${gameKey}"] .scan-all-btn`);
        if (btn) btn.classList.add('scanning');

        // Expand the card to show progress
        if (!this.expandedGames.has(gameKey)) {
            this.toggleGameExpand(gameKey);
        }

        for (const server of group.servers) {
            await this.scanSingleServer(server.id, false);
        }

        if (btn) btn.classList.remove('scanning');
        this.updateStats();
        this.renderGameCards();
    }

    /**
     * Scan a single server
     */
    async scanSingleServer(serverId, updateUI = true) {
        const server = this.servers.find(s => s.id === serverId);
        if (!server) return;

        // Update row to testing state
        const row = document.querySelector(`.server-row[data-server-id="${serverId}"]`);
        if (row) {
            const statusBadge = row.querySelector('.server-status-badge');
            statusBadge.className = 'server-status-badge testing';
            statusBadge.innerHTML = '<span class="status-indicator"></span>Testing...';

            const scanBtn = row.querySelector('.server-row-scan');
            if (scanBtn) scanBtn.classList.add('scanning');
        }

        const result = await networkTester.runStabilityTest(server, 3, 300);
        networkTester.results.set(serverId, result);
        networkTester.addToHistory(serverId, result);

        // Update row with result
        if (row) {
            const latencyEl = row.querySelector('.server-latency');
            const jitterEl = row.querySelector('.server-jitter');
            const statusBadge = row.querySelector('.server-status-badge');
            const scanBtn = row.querySelector('.server-row-scan');

            const latencyQuality = result.latency ? NetworkTester.getLatencyQuality(result.latency) : '';
            latencyEl.className = `server-latency ${latencyQuality}`;
            latencyEl.textContent = result.latency ? `${result.latency}ms` : '--';

            jitterEl.textContent = result.jitter !== undefined ? `±${result.jitter}ms` : '--';

            const statusClass = result.status === 'reachable' ? 'online' : 'blocked';
            const statusLabel = result.status === 'reachable' ? 'Online' : 'Blocked';
            statusBadge.className = `server-status-badge ${statusClass}`;
            statusBadge.innerHTML = `<span class="status-indicator"></span>${statusLabel}`;

            if (scanBtn) scanBtn.classList.remove('scanning');
        }

        if (updateUI) {
            this.updateStats();
            // Update card header stats
            this.updateGameCardStats(serverId);
        }

        if (this.selectedServerForChart === serverId) {
            this.updateChart();
        }
    }

    /**
     * Update game card header stats after scan
     */
    updateGameCardStats(serverId) {
        const server = this.servers.find(s => s.id === serverId);
        if (!server) return;

        const gameKey = `${server.name}-${server.publisher}`;
        const group = this.groupedServers[gameKey];
        if (!group) return;

        const card = document.querySelector(`.game-card[data-game-key="${gameKey}"]`);
        if (!card) return;

        // Calculate all results for status
        const allResults = group.servers.map(s => networkTester.getResult(s.id)).filter(r => r);
        const reachableCount = allResults.filter(r => r.status === 'reachable').length;
        const testedCount = allResults.length;

        // Calculate best ping for display
        const validResults = group.servers
            .map(s => ({ server: s, result: networkTester.getResult(s.id) }))
            .filter(item => item.result && item.result.latency !== null);

        validResults.sort((a, b) => a.result.latency - b.result.latency);
        const bestItem = validResults[0];

        // Update best ping
        const pingEl = card.querySelector('.game-ping');
        if (pingEl && bestItem) {
            const bestPing = bestItem.result.latency;
            pingEl.className = `game-ping ${NetworkTester.getLatencyQuality(bestPing)}`;
            pingEl.innerHTML = `${bestPing}ms<span class="ping-label">${bestItem.server.region}</span>`;
        }

        // Update status
        let overallStatus = 'pending';
        if (testedCount > 0) {
            if (reachableCount === testedCount) overallStatus = 'reachable';
            else if (reachableCount > 0) overallStatus = 'partial';
            else overallStatus = 'blocked';
        }

        const statusLabels = {
            pending: 'Not Tested',
            reachable: 'All Online',
            partial: `${reachableCount}/${testedCount} Online`,
            blocked: 'Blocked'
        };

        card.className = card.className.replace(/status-\w+/, `status-${overallStatus}`);

        const statusEl = card.querySelector('.game-status');
        if (statusEl) {
            statusEl.className = `game-status status-${overallStatus}`;
            statusEl.innerHTML = `<span class="status-dot"></span>${statusLabels[overallStatus]}`;
        }
    }

    /**
     * Update statistics display
     */
    updateStats() {
        const stats = networkTester.getStatistics();
        document.getElementById('reachableCount').textContent = stats.reachable;
        document.getElementById('blockedCount').textContent = stats.blocked;
        document.getElementById('totalServers').textContent = stats.total || this.servers.length;
        document.getElementById('avgLatency').textContent = stats.avgLatency !== null
            ? `${stats.avgLatency}ms` : '--';
    }

    /**
     * Populate chart server select dropdown
     */
    populateChartSelect(servers) {
        const select = document.getElementById('chartServerSelect');
        const grouped = {};
        servers.forEach(server => {
            if (!grouped[server.publisher]) grouped[server.publisher] = [];
            grouped[server.publisher].push(server);
        });

        let options = '<option value="">Select target...</option>';
        Object.keys(grouped).sort().forEach(publisher => {
            options += `<optgroup label="${publisher}">`;
            grouped[publisher].forEach(server => {
                options += `<option value="${server.id}">${server.name} - ${server.region}</option>`;
            });
            options += '</optgroup>';
        });
        select.innerHTML = options;
    }

    /**
     * Update latency history chart
     */
    updateChart() {
        const canvas = document.getElementById('latencyChart');
        const placeholder = document.getElementById('chartPlaceholder');
        const ctx = canvas.getContext('2d');

        if (!this.selectedServerForChart) {
            placeholder.classList.remove('hidden');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        const history = networkTester.getHistory(this.selectedServerForChart);
        if (history.length === 0) {
            placeholder.classList.remove('hidden');
            placeholder.querySelector('p').textContent = 'No scan data. Run analysis first.';
            return;
        }

        placeholder.classList.add('hidden');
        this.drawChart(ctx, canvas, history);
    }

    /**
     * Draw latency chart
     */
    drawChart(ctx, canvas, history) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const padding = { top: 30, right: 20, bottom: 40, left: 60 };
        const chartWidth = canvas.width - padding.left - padding.right;
        const chartHeight = canvas.height - padding.top - padding.bottom;

        const latencies = history.map(h => h.latency).filter(l => l !== null);
        if (latencies.length === 0) return;

        const maxLatency = Math.max(...latencies, 100);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Colors from theme
        const textColor = '#8888a0';
        const gridColor = 'rgba(220, 38, 38, 0.1)';
        const accentColor = '#dc2626';

        // Grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + chartWidth, y);
            ctx.stroke();

            const value = Math.round(maxLatency - (maxLatency / 5) * i);
            ctx.fillStyle = textColor;
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`${value}ms`, padding.left - 10, y + 4);
        }

        // Data line
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const points = [];
        history.forEach((h, i) => {
            if (h.latency === null) return;
            const x = padding.left + (chartWidth / (history.length - 1 || 1)) * i;
            const y = padding.top + chartHeight - (h.latency / maxLatency) * chartHeight;
            points.push({ x, y, latency: h.latency });
            if (points.length === 1) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Fill
        if (points.length > 1) {
            const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
            gradient.addColorStop(0, 'rgba(220, 38, 38, 0.2)');
            gradient.addColorStop(1, 'rgba(220, 38, 38, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(points[0].x, padding.top + chartHeight);
            points.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
            ctx.closePath();
            ctx.fill();
        }

        // Points
        points.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.fill();

            if (i === points.length - 1) {
                ctx.fillStyle = textColor;
                ctx.font = 'bold 12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`${p.latency}ms`, p.x, p.y - 12);
            }
        });
    }

    showLoading() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    addCustomServer(server) {
        if (this.servers.find(s => s.id === server.id)) return false;
        this.servers.unshift(server);
        this.groupedServers = this.groupServersByGame(this.servers);
        this.renderGameCards();
        this.populateChartSelect(this.servers);
        return true;
    }
}

const uiController = new UIController();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UIController, uiController };
}
