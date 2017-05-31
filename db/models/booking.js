const db = require('../');

const Booking = db.Model.extend({
  tableName: 'bookings',
  user: function() {
    return this.belongsTo('User');
  },
  guide: function() {
    return this.belongsTo('Guide');
  }
});

module.exports = db.model('Booking', Booking);
