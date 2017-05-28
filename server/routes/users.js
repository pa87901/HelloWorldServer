'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').Users;

router.route('/')
  // .get(UserController.getAll)
  .post(UserController.createUser)
  ;

router.route('/:id')
  .get(UserController.getUser)
  // .put(UserController.update)
  // .delete(UserController.deleteOne)
  ;

module.exports = router;
