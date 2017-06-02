// const app = require('./app');
// // Set up an http server for socket.io purposes.
// const http = require('http').Server(app);

// /////////////////////////////////////////////

// // socket.io chat server.
// // Initialise new instance of socket.io by passing the http (HTTP Server) object.

// const io = require('socket.io')(http);
// // const io = require('socket.io').Server({port: 8080});

// let users = [];
// let connections = [];
// let messages = [{
//   text: 'Hello developer',
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
//   },
//   createdAt: Date.now(),
//   _id: 1,
// }];

// // Listen on connection event for incoming sockets.
// module.exports = function(io) {
//   io.on('connection', (socket) => {
//   console.log('A user connected to socket.io messenger app.', socket.handshake.query);

//   const chatsController = require('./controllers/chats');
//   // io.emit('chat message', messages);
//   // Get messages from db and emit them back to client.
//   let req = {
//     params: {
//       facebookId: socket.handshake.query.userId,
//       guideFacebookId: socket.handshake.query.guideId
//     }
//   };
//   chatsController.getChat(req, null, (data) => {
//     // console.log('chatsRetreived', data);
//     io.emit('chat message', JSON.parse(JSON.stringify(data)));
//   });


//   socket.on('chat message', (msg) => {
//     console.log('Server received a chat msg', msg);
//     // let message = msg[0];
//     io.emit('new message', msg);

//     msg.forEach(message => {
//       // messages.unshift(message);

//       // Put this received message to the database.
//       // Format to flat {} structure.
//       let dbFormattedMessage = {
//         facebookId: message.user._id,
//         guideFacebookId: message.user.guideId,
//         message: message.text,
//         author: message.user.guide === true ? 'guide' : ''
//       };
//       console.log('received message', message, 'formatted message', dbFormattedMessage);

//       // Create message in database.
//       let req = {
//         body: dbFormattedMessage
//       };
//       chatsController.createChat(req);
//     });
//     console.log('message: ' + msg, 'all messages: ', messages);
//     // io.emit('chat message', messages);
//   });

//   // When this connection disconnects...
//   socket.on('disconnect', () => {
//     console.log('User disconnected.');
//   });
// }