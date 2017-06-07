const models = require('../../db/models');

module.exports.createBooking = (req, res) => {
  models.User.where({facebook_id: req.body.travelerId}).fetch({columns: ['id']})
  .then(result => {
    models.User.where({facebook_id: req.body.guideFacebookId}).fetch({columns: ['id']})
    .then(result2 => {
      models.Guide.where({user_id: result2.id}).fetch({columns: ['id']})
      .then(result3 => {
        models.Booking.forge({user_id: result.id, guide_id: result3.id, city: req.body.city, start_hr: req.body.startHr, end_hr: req.body.endHr, date: req.body.date})
        .save()
        .then(result => {
          console.log('success creating booking!!');
          res.status(200).send();
        });
      });
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch((err) => {
    console.log('error creating booking.', err);
    res.sendStatus(404);
  });   
};

module.exports.updateBookingStatus = (req, res) => {
  models.Booking.where({id: req.body.bookingId}).fetch()
  .then(fetchedModel => {
    fetchedModel.save({
      status: req.body.status
    })
    .then(result => {
      res.status(200).send();
      console.log('Successfully updated booking!');
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    console.log('error updating booking.');
    res.sendStatus(404);
  });   
};

module.exports.getUserBookings = (req, res) => {
  models.User.where({facebook_id: req.params.facebookId})
  .fetchAll({
    withRelated: [
      {
        'bookings': function(qb) {
          qb.select();        
        }
      },
      {
        'bookings.user': function(qb) {
          qb.select();
        }
      },
      {
        'bookings.guide.user': function(qb) {
          qb.select();
        }
      }
    ]
  })
  .then(result => {
    console.log('successfully retrieved booking information!');
    res.status(200).send(result);
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    console.log('error retrieving booking.');
    res.sendStatus(404);
  });   
};

module.exports.getAllGuideBookings = (req, res) => {
  models.User.where({facebook_id: req.params.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.Guide.where({user_id: result.id}).fetchAll({
      withRelated: [
        {
          'bookings': function(qb) {
            qb.select();
          }
        },
        {
          'bookings.user': function(qb) {
            qb.select();
          }
        }
      ]
    })
    .then(result2 => {
      console.log('successfully retrieved booking information!');
      res.status(200).send(result2);
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(err => {
    console.log('error retrieving booking.', err);
    res.sendStatus(404);
  });   
};

module.exports.getRequestedGuideBookings = (req, res) => {
  models.User.where({facebook_id: req.params.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.Guide.where({user_id: result.id}).fetchAll({
      withRelated: [
        {
          'bookings': function(qb) {
            qb.where('status', 'requested');
          }
        },
        {
          'bookings.user': function(qb) {
            qb.select();
          }
        }
      ]  
    })
    .then(result2 => {
      console.log('successfully retrieved booking information!');
      res.status(200).send(result2); 
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(err => {
    console.log('error retrieving booking.', err);
    res.sendStatus(404);
  });
};


module.exports.updateGuideReviewRatingTip = (req, res) => {
  models.Booking.where({id: req.body.bookingId}).fetch()
  .then(fetchedModel => {
    console.log(fetchedModel);
    fetchedModel.save({
      guide_review: req.body.guide_review,
      guide_rating: req.body.guide_rating,
      tips: req.body.tips
    })
    .then(result => {
      res.status(200).send();
      console.log('Successfully updated guide review ratings and tips!');
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    console.log('error updating booking.');
    res.sendStatus(404);
  });   
};

module.exports.updateUserReviewRating = (req, res) => {
  models.Booking.where({id: req.body.bookingId}).fetch()
  .then(fetchedModel => {
    fetchedModel.save({
      user_review: req.body.user_review,
      user_rating: req.body.user_rating
    })
    .then(result => {
      res.status(200).send();
      console.log('Successfully updated guide review ratings and tips!');
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch((err) => {
    console.log('error updating booking.', err);
    res.sendStatus(404);
  });   
};


module.exports.getLast5MinutesOfReviews = (callback) => {
  models.Booking.where('updated_at', '>', new Date(Date.now() - 300000000).toISOString()).fetchAll()
  .then(fetchedModels => {
    callback(fetchedModels);
  })
  .catch((err) => {
    console.log('No reviews', err);
  });
};

module.exports.getUserAverageRating = (userId, callback) => {
  models.Booking.where('user_id', '=', userId).fetchAll()
  .then((data)=>{
    data = JSON.parse(JSON.stringify(data));
    var average = data.reduce((acc, datum)=>{ return acc + datum.user_rating; }, 0)/data.length;
    callback(average);
  });
};

module.exports.getGuideAverageRating = (guideId, callback) => {
  models.Booking.where('guide_id', '=', guideId).fetchAll()
  .then((data)=>{
    data = JSON.parse(JSON.stringify(data));
    var average = data.reduce((acc, datum)=>{ return acc + datum.user_rating; }, 0)/data.length;
    callback(average);
  });
};

// module.exports.getUserAverageRating(1, (avg)=>{console.log('User average: ', avg)});
// module.exports.getGuideAverageRating(1, (avg)=>{console.log('Guide average: ', avg)});