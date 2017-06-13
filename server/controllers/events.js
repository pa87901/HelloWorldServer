const models = require('../../db/models');
const collections = require('../../db/collections');

module.exports.createEvents = (req, res) => {
  let eventsToSave = req.body.events.map(event => {
    return {
      'availability_id': req.params.bookingId,
      'type': '',
      'establishment_type': '',
      'event_name': event,
      'longitude': 0,
      'latitude': 0
    };
  });
  
  // Create an object that is in the format required by the database to populate non-nullable columns
  collections.Events.forge(eventsToSave)
  .invokeThen('save')
  .then(result => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(404);
  });
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