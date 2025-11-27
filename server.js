const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let visitors = 0;

io.on('connection', (socket) => {
  visitors++;
  io.emit('visitors', visitors);

  socket.on('disconnect', () => {
    visitors--;
    io.emit('visitors', visitors);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});