const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

app.ws('/chat/:id', function(ws, req) {
    const { id } = req.params
    console.log(id)
    console.log('New WebSocket connection');
    
    ws.on('message', function(msg) {
        console.log('Received message:', msg);

        // Broadcast the received message to all connected clients
        expressWs.getWss().clients.forEach(function(client) {
            if (client.readyState === 1) { // Check if the client is open
                client.send(msg);
            }
        });
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
