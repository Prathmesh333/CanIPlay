/**
 * Network Connectivity Test Engine
 * Handles latency measurement and server reachability testing
 */

class NetworkTester {
    constructor() {
        this.results = new Map();
        this.history = new Map();
        this.isRunning = false;
        this.abortController = null;
        this.maxHistoryLength = 10;
    }

    /**
     * Test a single endpoint using fetch with no-cors mode
     * @param {string} url - URL to test
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<Object>} Test result
     */
    async testFetch(url, timeout = 5000) {
        const start = performance.now();

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            await fetch(url, {
                mode: 'no-cors',
                cache: 'no-store',
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const latency = Math.round(performance.now() - start);

            return {
                status: 'reachable',
                latency: latency,
                timestamp: Date.now()
            };
        } catch (error) {
            const elapsed = Math.round(performance.now() - start);

            if (error.name === 'AbortError') {
                return {
                    status: 'timeout',
                    latency: null,
                    error: 'Request timed out',
                    timestamp: Date.now()
                };
            }

            // Network errors might still indicate the server is reachable
            // but blocking the request (CORS), so we check elapsed time
            if (elapsed < timeout * 0.8) {
                return {
                    status: 'reachable',
                    latency: elapsed,
                    note: 'CORS blocked but reachable',
                    timestamp: Date.now()
                };
            }

            return {
                status: 'blocked',
                latency: null,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }

    /**
     * Test endpoint by loading an image
     * @param {string} url - Image URL to load
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<Object>} Test result
     */
    async testImage(url, timeout = 5000) {
        return new Promise((resolve) => {
            const start = performance.now();
            const img = new Image();
            let resolved = false;

            const timeoutId = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    img.src = '';
                    resolve({
                        status: 'timeout',
                        latency: null,
                        error: 'Image load timed out',
                        timestamp: Date.now()
                    });
                }
            }, timeout);

            img.onload = () => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeoutId);
                    resolve({
                        status: 'reachable',
                        latency: Math.round(performance.now() - start),
                        timestamp: Date.now()
                    });
                }
            };

            img.onerror = () => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeoutId);
                    const elapsed = Math.round(performance.now() - start);

                    // Quick error responses might indicate CORS/blocked
                    // but server is technically reachable
                    if (elapsed < 1000) {
                        resolve({
                            status: 'reachable',
                            latency: elapsed,
                            note: 'Error but fast response',
                            timestamp: Date.now()
                        });
                    } else {
                        resolve({
                            status: 'blocked',
                            latency: null,
                            error: 'Image failed to load',
                            timestamp: Date.now()
                        });
                    }
                }
            };

            // Add cache-busting query param
            const separator = url.includes('?') ? '&' : '?';
            img.src = `${url}${separator}_t=${Date.now()}`;
        });
    }

    /**
     * Test a server using the best available method
     * @param {Object} server - Server configuration object
     * @returns {Promise<Object>} Test result
     */
    async testServer(server) {
        const testUrl = server.testEndpoint;

        // Try image test first if URL looks like an image
        if (/\.(png|jpg|jpeg|gif|ico|svg|webp)(\?|$)/i.test(testUrl)) {
            return await this.testImage(testUrl);
        }

        // Otherwise use fetch
        return await this.testFetch(testUrl);
    }

    /**
     * Run stability test (multiple pings)
     * @param {Object} server - Server to test
     * @param {number} pingCount - Number of pings
     * @param {number} delay - Delay between pings in ms
     * @returns {Promise<Object>} Aggregated results
     */
    async runStabilityTest(server, pingCount = 5, delay = 500) {
        const results = [];

        for (let i = 0; i < pingCount; i++) {
            const result = await this.testServer(server);
            results.push(result);

            if (i < pingCount - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        // Calculate statistics
        const successfulPings = results.filter(r => r.status === 'reachable');
        const latencies = successfulPings.map(r => r.latency).filter(l => l !== null);

        if (latencies.length === 0) {
            return {
                status: 'blocked',
                latency: null,
                packetLoss: 100,
                jitter: null,
                minLatency: null,
                maxLatency: null,
                samples: results.length,
                timestamp: Date.now()
            };
        }

        const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
        const minLatency = Math.min(...latencies);
        const maxLatency = Math.max(...latencies);
        const packetLoss = Math.round((1 - successfulPings.length / results.length) * 100);

        // Calculate jitter (average deviation from mean)
        const jitter = latencies.length > 1
            ? Math.round(latencies.reduce((acc, l) => acc + Math.abs(l - avgLatency), 0) / latencies.length)
            : 0;

        return {
            status: 'reachable',
            latency: avgLatency,
            packetLoss: packetLoss,
            jitter: jitter,
            minLatency: minLatency,
            maxLatency: maxLatency,
            samples: results.length,
            timestamp: Date.now()
        };
    }

    /**
     * Test all servers in the database
     * @param {Array} servers - Array of server objects
     * @param {Function} onProgress - Callback for progress updates
     * @param {boolean} stabilityTest - Run stability test if true
     * @returns {Promise<Map>} Map of server IDs to results
     */
    async testAllServers(servers, onProgress = null, stabilityTest = false) {
        if (this.isRunning) {
            console.warn('Test already in progress');
            return this.results;
        }

        this.isRunning = true;
        this.abortController = new AbortController();

        const concurrency = 4; // Test 4 servers at a time
        let completed = 0;

        const testBatch = async (batch) => {
            const promises = batch.map(async (server) => {
                if (this.abortController.signal.aborted) return;

                const result = stabilityTest
                    ? await this.runStabilityTest(server)
                    : await this.testServer(server);

                this.results.set(server.id, result);
                this.addToHistory(server.id, result);

                completed++;
                if (onProgress) {
                    onProgress(server.id, result, completed, servers.length);
                }
            });

            await Promise.all(promises);
        };

        // Process in batches
        for (let i = 0; i < servers.length; i += concurrency) {
            if (this.abortController.signal.aborted) break;

            const batch = servers.slice(i, i + concurrency);
            await testBatch(batch);

            // Small delay between batches
            if (i + concurrency < servers.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        this.isRunning = false;
        return this.results;
    }

    /**
     * Add result to history for a server
     * @param {string} serverId - Server ID
     * @param {Object} result - Test result
     */
    addToHistory(serverId, result) {
        if (!this.history.has(serverId)) {
            this.history.set(serverId, []);
        }

        const history = this.history.get(serverId);
        history.push({
            latency: result.latency,
            status: result.status,
            timestamp: result.timestamp
        });

        // Keep only last N entries
        if (history.length > this.maxHistoryLength) {
            history.shift();
        }
    }

    /**
     * Get history for a server
     * @param {string} serverId - Server ID
     * @returns {Array} History array
     */
    getHistory(serverId) {
        return this.history.get(serverId) || [];
    }

    /**
     * Get result for a server
     * @param {string} serverId - Server ID
     * @returns {Object|null} Test result
     */
    getResult(serverId) {
        return this.results.get(serverId) || null;
    }

    /**
     * Get all results
     * @returns {Map} All results
     */
    getAllResults() {
        return this.results;
    }

    /**
     * Cancel running tests
     */
    cancel() {
        if (this.abortController) {
            this.abortController.abort();
        }
        this.isRunning = false;
    }

    /**
     * Get latency quality rating
     * @param {number} latency - Latency in ms
     * @returns {string} Quality rating
     */
    static getLatencyQuality(latency) {
        if (latency === null) return 'unknown';
        if (latency < 50) return 'excellent';
        if (latency < 100) return 'good';
        if (latency < 150) return 'acceptable';
        return 'poor';
    }

    /**
     * Get status display info
     * @param {string} status - Status string
     * @returns {Object} Display info
     */
    static getStatusInfo(status) {
        const statusMap = {
            'reachable': { label: 'Playable', class: 'reachable', icon: '✓' },
            'blocked': { label: 'Blocked', class: 'blocked', icon: '✗' },
            'timeout': { label: 'Timeout', class: 'blocked', icon: '⏱' },
            'warning': { label: 'High Ping', class: 'warning', icon: '⚠' },
            'testing': { label: 'Testing', class: 'testing', icon: '◌' },
            'pending': { label: 'Pending', class: 'pending', icon: '○' }
        };

        return statusMap[status] || statusMap['pending'];
    }

    /**
     * Calculate aggregate statistics
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const results = Array.from(this.results.values());
        const reachable = results.filter(r => r.status === 'reachable');
        const blocked = results.filter(r => r.status === 'blocked' || r.status === 'timeout');

        const latencies = reachable.map(r => r.latency).filter(l => l !== null);
        const avgLatency = latencies.length > 0
            ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
            : null;

        return {
            total: results.length,
            reachable: reachable.length,
            blocked: blocked.length,
            avgLatency: avgLatency
        };
    }
}

// Create global instance
const networkTester = new NetworkTester();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NetworkTester, networkTester };
}
