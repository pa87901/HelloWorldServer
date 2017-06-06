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

//Route for guide reviews rating and tips
router.route('/guide/rrt/')
  .put(BookingController.updateGuideReviewRatingTip);

//Route for user reviews and ratings
router.route('/user/rr/')
  .put(BookingController.updateUserReviewRating);

module.exports = router;