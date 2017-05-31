'use strict';
const express = require('express');
const router = express.Router();
const BookingController = require('../controllers').Bookings;

router.route('/')
  .post(BookingController.createBooking)
  .put(BookingController.updateBookingStatus)
  ;

module.exports = router;