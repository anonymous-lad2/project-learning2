// Import Node.js HTTP module for creating web servers
const http = require('http');

/**
 * Create HTTP server with SSE endpoint
 * 
 * This server handles two types of requests:
 * 1. SSE endpoint (/events) - sends continuous event streams
 * 2. Health check (all other routes) - confirms server is running
 */
const server = http.createServer((req, res) => {
    /**
     * Server-Sent Events (SSE) Endpoint
     * 
     * When clients request /events, we establish a persistent connection
     * that sends timestamped messages every 2 seconds.
     */
    if (req.url === '/events') {
        // Set SSE-specific response headers
        res.writeHead(200, {
            'Content-Type': 'text/event-stream', // Mandatory for SSE
            'Cache-Control': 'no-cache',        // Prevent caching of events
            'Connection': 'keep-alive'          // Maintain persistent connection
        });

        /**
         * Event Stream Generator
         * 
         * Sends a new event to the client every 2000ms (2 seconds)
         * Each event follows the SSE format:
         * data: <json-payload>\n\n
         */
        const interval = setInterval(() => {
            // Construct the event data
            const eventData = {
                message: `Hello at ${new Date().toISOString()}`
            };
            
            // Write the event in SSE format
            // Note: \n\n is required to mark end of each event
            res.write(`data: ${JSON.stringify(eventData)}\n\n`);
            
            // Optional: Log to console for debugging
            console.log(`Sent event: ${JSON.stringify(eventData)}`);
        }, 2000);

        /**
         * Connection Cleanup Handler
         * 
         * When client closes connection:
         * 1. Clear the interval to stop sending events
         * 2. End the response properly
         */
        req.on('close', () => {
            clearInterval(interval);
            res.end();
            console.log('Client disconnected from SSE stream');
        });
    }
    /**
     * Health Check Endpoint
     * 
     * Simple response for all other routes to confirm server is running
     */
    else {
        res.writeHead(200);
        res.end('Server is up');
    }
});

/**
 * Start the server on port 3000
 */
server.listen(3000, () => {
    console.log('SSE Server running at http://localhost:3000');
    console.log('Available endpoints:');
    console.log('  - /events     : SSE stream');
    console.log('  - /           : Health check');
});

/**
 * Key SSE Concepts Implemented:
 * 
 * 1. Persistent Connection: The connection remains open indefinitely
 * 2. Event Stream Format: Each message follows "data: ...\n\n" format
 * 3. Automatic Reconnection: Browsers will automatically reconnect if the connection drops
 * 4. Efficient Protocol: Lightweight alternative to WebSockets for server-to-client push
 * 
 * Browser Usage Example:
 * 
 * const eventSource = new EventSource('http://localhost:3000/events');
 * eventSource.onmessage = (e) => { console.log(JSON.parse(e.data)); };
 */