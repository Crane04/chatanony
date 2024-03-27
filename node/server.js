const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

// Mapping to store WebSocket connections for each chat room
const chatRooms = {};

app.ws('/chat/:id', function(ws, req) {
    const { id } = req.params;
    console.log('New WebSocket connection for chat room:', id);
    
    // Store the WebSocket connection for the corresponding chat room
    if (!chatRooms[id]) {
        chatRooms[id] = [];
    }
    chatRooms[id].push(ws);

    ws.on('message', function(msg) {
        console.log('Received message:', msg);

        // Broadcast the received message to all clients in the same chat room
        if (chatRooms[id]) {
            chatRooms[id].forEach(function(client) {
                if (client.readyState === 1) { // Check if the client is open
                    client.send(msg);
                }
            });
        }
    });

    // Cleanup WebSocket connection when it closes
    ws.on('close', function() {
        if (chatRooms[id]) {
            const index = chatRooms[id].indexOf(ws);
            if (index > -1) {
                chatRooms[id].splice(index, 1);
            }
        }
    });
});

app.listen(3000);
