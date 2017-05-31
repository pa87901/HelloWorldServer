'use strict';
const express = require('express');
const router = express.Router();
const GuideController = require('../controllers').Guides;

router.route('/')
  .post(GuideController.createGuide)
  ;

router.route('/:id')
  .get(GuideController.getOneGuide)
  // .get(GuideController.getGuide)
  // .put(UserController.update)
  // .delete(UserController.deleteOne)
  ;

router.route('/search/:city/:date/:startHr/:endHr')
  .get(GuideController.getSearchResults)
  ;

module.exports = router;