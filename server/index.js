'use strict';
const app = require('./app');
// Set up an http server for socket.io purposes.
const http = require('http').Server(app);
module.exports.http = http;
const db = require('../db');
const PORT = process.env.port || 3000;


/////////////////////////////////////////////

// socket.io chat server.
// Initialise new instance of socket.io by passing the http (HTTP Server) object.
const io = require('socket.io')(http);

let users = [];
let connections = [];
let messages = [{
  _id: 1,
  text: 'Hello developer',
  createdAt: Date.now(),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://facebook.github.io/react/img/logo_og.png',
  },
}];

// Listen on connection event for incoming sockets.
io.on('connection', (socket) => {
  console.log('A user connected to socket.io messenger app.');
  io.emit('chat message', messages);
  socket.on('chat message', (msg) => {
    msg.forEach(message => {
      messages.unshift(message);
    });
    console.log('message: ' + msg, 'all messages: ', messages);
    io.emit('chat message', messages);
  });

  // When this connection disconnects...
  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});


/////////////////////////////////////////////

http.listen(PORT, () => {
  console.log('Example app listening on port: ' + PORT);
});
