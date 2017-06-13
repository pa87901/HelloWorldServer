const models = require('../../db/models');
const collections = require('../../db/collections');

module.exports.createEvents = (events, availabilityId) => {
  let eventsToSave = events.map(event => {
    return {
      'availability_id': availabilityId,
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
  // .then(result => {
  //   res.sendStatus(200);
  // })
  // .catch(err => {
  //   res.sendStatus(404);
  // });
  .then(result => {
    return result;
  });
};

module.exports.getAvailabilitesEvents = (req, res) =>{

};

module.exports.updateBookingIdOfEvent = (bookingId, availabilityId) => {
  // models.Event.forge()
  // .where({availability_id: availabilityId})
  // .save({booking_id: bookingId},{patch:true})
  // .then(result => {
  //   return result;
  // })
  console.log('availabilityId', availabilityId, 'bookingId', bookingId);
  models.Event.where({availability_id: availabilityId}).fetchAll()
  .then(fetchedEvents => {
    console.log('fetchedEvents', fetchedEvents);
    fetchedEvents.forEach(fetchedEvent => {
      fetchedEvent.save({booking_id: bookingId}).then(result => {
        console.log('saved');
      });
    });
  })
  .catch(err => {
    console.error('Error updating events.');
  });
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