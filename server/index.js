'use strict';
const app = require('./app');
// Set up an http server for socket.io purposes.
const http = require('http').Server(app);
module.exports.http = http;
const db = require('../db');
const PORT = process.env.port || 3000;
const workers = require('./workers');
var CronJob = require('cron').CronJob;

var job = new CronJob({
  cronTime: '5 * * * *',
  onTick: workers.updateRatings,
  start: true,
  timeZone: 'America/Los_Angeles'
});

/////////////////////////////////////////////

// socket.io chat server.
// Initialise new instance of socket.io by passing the http (HTTP Server) object.

const io = require('socket.io')(http);
// const io = require('socket.io').Server({port: 8080});

let users = [];
let connections = [];
let messages = [{
  text: 'Hello developer',
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://facebook.github.io/react/img/logo_og.png',
  },
  createdAt: Date.now(),
  _id: 1,
}];

// Listen on connection event for incoming sockets.
io.on('connection', (socket) => {
  console.log('A user connected to socket.io messenger app.', socket.handshake.query);
  // Configure private room as client does.
  let privateRoomToJoin = socket.handshake.query.userId + '-' + socket.handshake.query.guideId;
  socket.on('room', room => {
    socket.join('AlexLiang');
  });
  socket.emit('connect'); //Send action to client to tell it to join room.
  const chatsController = require('./controllers/chats');
  // Get messages from db and emit them back to client.
  let req = {
    params: {
      facebookId: socket.handshake.query.userId,
      guideFacebookId: socket.handshake.query.guideId
    }
  };
  chatsController.getChat(req, null, (data) => {
    let req2 = {
      params: {
        facebookId: socket.handshake.query.guideId,
        guideFacebookId: socket.handshake.query.userId,
      }
    };
    chatsController.getChat(req2, null, (data2) => {
      // Combine the chats.
      if (!data.models.length) {
        data = {models: []};
      }
      if (!data2.models.length) {
        data2 = {models: []};
      }
      data = data.models.concat(data2.models);
      // data.sort((a, b) => {
      //   return a.
      // })
      console.log('DATA', data, data.length);
      io.emit('chat message', JSON.parse(JSON.stringify(data)));
    });
  });


  socket.on('chat message', (msg) => {
    console.log('Server received a chat msg', msg);
    io.to('AlexLiang').emit('new message', msg);

    msg.forEach(message => {
      // Put this received message to the database.
      // Format to flat {} structure.
      let dbFormattedMessage = {
        facebookId: message.user._id,
        guideFacebookId: message.user.guideId,
        message: message.text,
        author: message.user.author
      };
      console.log('received message', message, 'formatted message', dbFormattedMessage);

      // Create message in database.
      let req = {
        body: dbFormattedMessage
      };
      chatsController.createChat(req);
    });
    console.log('message: ' + msg, 'all messages: ', messages);
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
