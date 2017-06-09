'use strict';
const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers').Payments;

router.route('/')
  .post(PaymentController.createCharge)
  ;

module.exports = router;