'use strict';
const express = require('express');
const router = express.Router();
const BookingController = require('../controllers').Bookings;

router.route('/')
  .post(BookingController.createBooking)
  .put(BookingController.updateBookingStatus)
  ;

router.route('/all/user/:facebookId')
  .get(BookingController.getUserBookings)
  ;

router.route('/all/guide/:facebookId')
  .get(BookingController.getAllGuideBookings)
  ;

router.route('/requested/guide/:facebookId')
  .get(BookingController.getRequestedGuideBookings)
  ;

module.exports = router;