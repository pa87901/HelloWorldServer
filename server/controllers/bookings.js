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
  console.log('BODY', req.body.status);
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
