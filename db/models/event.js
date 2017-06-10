const db = require('../');

const Event = db.Model.extend({
  tableName: 'events',
  booking: function() {
    return this.belongsTo('Booking');
  },
  availability: function() {
    return this.belongsTo('Availability');
  }
});

module.exports = db.model('Event', Event);
