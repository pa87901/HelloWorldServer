const models = require('../../db/models');

module.exports.createEvents = (req, res) => {
  var options = {};
  console.log(req.body.events.eventsType);
  // options [eventsType +'_id'] = eventId
  options['availability_id'] = '1';
  options['booking_id'] = '1';
  models.Event.where(options).destroy()
    .then((result)=> {
      models.Event.forge(req.body.events.list).save();
    });
};


req = {};
req.body = {};
req.body.events = {
  eventsType: 'availability',
  eventId: '1',
  list: {
    booking_id: '1',
    availability_id: '1',
    type: 'availability',
    establishment_type: 'point_of_interest',
    event_name: 'Legion of Honor, San Francisco, CA, United States',
    longitude: '37.7863901802915',
    latitude: '-122.4980650197085',
    time_spent: '45',
    travel_time: '7',
    google_place_id: 'ChIJmUsJz6yHhYARS9zv8DkGiEQ',
    google_maps_url: 'https://maps.google.com/?cid=4938203837336902731'
  }
};

module.exports.getAvailabilitesEvents = (req, res) =>{

};

module.exports.createEvent = (req, res) => {
  // models.Event.where({booking_id: req.params.bookingId}).fetch({colums: ['availability_id']})
  // .then()
  
};

module.exports.getEventsPerBooking = (req, res) => {
  models.Event.where({booking_id: req.params.bookingId}).fetchAll({
    withRelated: [
      {
        'booking': qb => {
          qb.select();
        }
      },
      {
        'booking.user': qb => {
          qb.select();
        }
      },
      {
        'booking.guide.user': qb => {
          qb.select();
        }
      }
    ]
  })
  .then(result => {
    res.status(200).send(result);
  })
  .catch(error => {
    res.status(404).send(error);
  });
};

module.exports.removeEventForABooking = (req, res) => {
  models.Event.where({booking_id: req.params.bookingId, event_name: req.params.eventName}).destroy({require: true})
  .then(response => {
    console.log('removeEventResponse', response);
    res.status(200).send();
  })
  .catch(error => {
    res.status(404).send(error);
  });
};