'use strict';
const express = require('express');
const router = express.Router();
const BookingController = require('../controllers').Bookings;

router.route('/')
  .post(BookingController.createBooking)
  .put(BookingController.updateBookingStatus)
  ;

router.route('/user/:facebookId')
  .get(BookingController.getUserBookings)
  ;


module.exports = router;