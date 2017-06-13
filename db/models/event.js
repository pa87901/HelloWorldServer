const db = require('../');

const Event = db.Model.extend({
  tableName: 'events',
  booking: function() {
    return this.belongsTo('Booking', 'booking_id');
  },
  availability: function() {
    return this.belongsTo('Availability', 'availability_id');
  }
});

// const Events = db.Collection.extend({
//   model: Event
// });

module.exports = db.model('Event', Event);
