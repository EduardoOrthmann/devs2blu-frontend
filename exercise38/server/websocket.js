import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import express from 'express';
const app = express();

const server = createServer(app);
const wss = new WebSocketServer({ server });

// Fiz qualquer coisa aqui pois quero me aprofundar mais em WebSockets no módulo de Angular
wss.on('connection', (socket) => {
  socket.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('Qualquer coisa');
      }
    });
  });
});

server.listen(3000, () => {
  console.log('WebSocket server is running on port 3000');
});
