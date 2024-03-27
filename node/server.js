const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

// Map to store WebSocket connections for each chat room
const chatRooms = {};

// 3. WebSocket Setup
app.ws('/chat/:id', function(ws, req) {
    const roomId = req.params.id;
    
    // Create a new chat room if it doesn't exist
    if (!chatRooms[roomId]) {
        chatRooms[roomId] = [];
    }

    // Add WebSocket connection to the appropriate chat room
    chatRooms[roomId].push(ws);

    // Remove closed connections from the chat room
    ws.on('close', function() {
        chatRooms[roomId] = chatRooms[roomId].filter(client => client !== ws);
    });

    ws.on('message', function(msg) {
        // Broadcast received message to all connected clients in the same chat room
        chatRooms[roomId].forEach(function(client) {
            if (client.readyState === 1) {
                client.send(msg);
            }
        });
    });
});

app.listen(3000);
