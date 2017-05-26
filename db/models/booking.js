const db = require('../');

const Booking = db.Model.extend({
  tableName: 'bookings',
  user: () => {
    return this.belongsTo('User');
  },
  guide: () => {
    return this.belongsTo('Guide');
  }
});

module.exports = db.model('Booking', Booking);
