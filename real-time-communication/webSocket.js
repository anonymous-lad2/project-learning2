// Import the WebSocket library
// 'ws' is a popular WebSocket implementation for Node.js
const WebSocket = require('ws');

/**
 * Create WebSocket Server
 * 
 * Initializes a WebSocket server listening on port 3000
 * This will handle all WebSocket connections and messages
 */
const server = new WebSocket.Server({ port: 3000 });

/**
 * Connection Event Handler
 * 
 * Triggered whenever a new client connects to the WebSocket server
 */
server.on("connection", (socket) => {
    // Log new connection to console
    console.log('Client connected');

    /**
     * Send Welcome Message
     * 
     * Immediately send a connection confirmation to the new client
     * JSON.stringify converts the object to a JSON string for transmission
     */
    socket.send(JSON.stringify({ 
        message: `Welcome! Connection established at ${new Date().toISOString()}` 
    }));

    /**
     * Message Event Handler
     * 
     * Triggered whenever the server receives a message from this client
     */
    socket.on("message", (data) => {
        // Log the received message to console
        console.log(`Received message: ${data}`);
        
        /**
         * Echo Response
         * 
         * Send the received message back to the client with acknowledgement
         * This creates a simple echo server that replies to each message
         */
        socket.send(JSON.stringify({ 
            message: `You said: ${data}` 
        }));
    });

    /**
     * Close Event Handler (Optional - recommended for cleanup)
     * 
     * Triggered when the client disconnects
     */
    socket.on("close", () => {
        console.log('Client disconnected');
    });

    /**
     * Error Event Handler (Optional - recommended for robustness)
     * 
     * Triggered when connection errors occur
     */
    socket.on("error", (error) => {
        console.error('WebSocket error:', error);
    });
});

// Log server startup message
console.log("WebSocket server is running on ws://localhost:3000");

/**
 * Key WebSocket Concepts:
 * 
 * 1. Full-Duplex Communication: Both server and client can send messages anytime
 * 2. Persistent Connection: Stays open after initial handshake
 * 3. Low Latency: Ideal for real-time applications
 * 4. Message-Based: Data is sent in discrete messages
 * 
 * Client-Side Example:
 * 
 * // In browser JavaScript:
 * const socket = new WebSocket('ws://localhost:3000');
 * socket.onmessage = (event) => { console.log(event.data); };
 * socket.send('Hello server!');
 */