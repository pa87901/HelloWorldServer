'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').Users;

router.route('/')
  // .get(UserController.getAll)
  .post(UserController.createUser)
  ;

router.route('/:facebookId')
  .get(UserController.getUser)
  // .put(UserController.update)
  // .delete(UserController.deleteOne)
  ;

router.route('/byUserId/:id')
  .get(UserController.getUserById)
  ;
  

module.exports = router;
