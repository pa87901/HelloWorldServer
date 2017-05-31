'use strict';
const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers').Availabilities;

router.route('/')
  .post(AvailabilityController.createAvailability)
  ;

module.exports = router;