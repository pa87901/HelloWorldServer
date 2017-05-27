'use strict';
const express = require('express');
const router = express.Router();
const RatingController = require('../controllers').Ratings;

router.route('/')
  .post(RatingController.createRating);

module.exports = router;