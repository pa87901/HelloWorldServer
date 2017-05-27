'use strict';
const express = require('express');
const router = express.Router();
const GuideController = require('../controllers').Guides;

router.route('/')
  // .get(UserController.getAll)
  .post(GuideController.createGuide)
  ;

router.route('/:id')
  // .get(GuideController.getGuide)
  // .put(UserController.update)
  // .delete(UserController.deleteOne)
  ;

module.exports = router;