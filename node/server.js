const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const rooms = {};

app.ws('/chat/:id', (ws, req) => {
    const roomId = req.params.id;

    // Join the room
    if (!rooms[roomId]) {
        rooms[roomId] = [];
    }
    rooms[roomId].push(ws);

    ws.on('message', (msg) => {
        // Broadcast message to all clients in the same room
        rooms[roomId].forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });

    ws.on('close', () => {
        // Remove client from the room
        rooms[roomId] = rooms[roomId].filter(client => client !== ws);
    });
});


app.listen(3000);
