'use strict';
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers').Chat;

// const app = express()
const http = require('../index.js').http;

// Set up an http server.
// const http = require('http').Server(app);
// Initialise new instance of socket.io by passing the http (HTTP Server) object.
const io = require('socket.io')(http);



router.route('/')
  .post(ChatController.createChat);

router.route('/:facebookId/:guideFacebookId')
  .get(ChatController.getChat);

module.exports = router;