// Import the built-in HTTP module from Node.js
// This module provides functionality to create HTTP servers and make HTTP requests
const http = require('http');

/**
 * Create an HTTP server
 * 
 * The server handles incoming requests and sends responses
 * 
 * @param {Object} req - The request object containing client request details
 * @param {Object} res - The response object used to send data back to the client
 */
const server = http.createServer((req, res) => {
    /**
     * Handle requests to the '/poll' endpoint
     * This endpoint simulates a long-polling scenario with a 3-second delay
     */
    if (req.url === '/poll') {
        // Set a timeout to simulate processing delay or waiting for data
        setTimeout(() => {
            // Set response headers
            // 200 status code indicates success
            // Content-Type specifies we're sending JSON data
            res.writeHead(200, { 'Content-Type': 'application/json' });
            
            // Send the response body as JSON
            // Includes a timestamp to show when the response was generated
            res.end(JSON.stringify({ 
                message: `Hello at ${new Date().toISOString()}` 
            }));
        }, 3000); // 3000ms (3 seconds) delay
    } 
    /**
     * Handle all other routes
     * This acts as a simple health check endpoint
     */
    else {
        // Send a basic text response for all other routes
        res.writeHead(200); // 200 OK status
        res.end('Server is up'); // Simple text response
    }
});

/**
 * Start the server listening on port 3000
 * 
 * The callback function executes when the server successfully starts
 */
server.listen(3000, () => {
    // Log to console when server is ready
    console.log('Server is listening on port 3000');
    
    /**
     * Server is now accessible at:
     * - http://localhost:3000/ → Returns "Server is up" immediately
     * - http://localhost:3000/poll → Returns JSON after 3 seconds
     */
});

/**
 * Key Concepts:
 * 
 * 1. HTTP Server: Listens for requests on a specific port and responds
 * 2. Request Routing: Different responses based on the URL path (req.url)
 * 3. Delayed Response: Simulates real-world scenarios where data isn't immediately available
 * 4. Response Headers: Metadata about the response (status code, content type)
 * 5. JSON Response: Structured data format commonly used in APIs
 */