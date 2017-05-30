'use strict';
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers').Chat;

router.route('/')
  .post(ChatController.createChat);

router.route('/:username/:guideUsername')
  .get(ChatController.getChat);

module.exports = router;