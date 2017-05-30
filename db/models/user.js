const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  guide: () => {
    return this.hasOne('Guide');
  },
  chats: () => {
    return this.hasMany('Chat');
  },
  ratings: () => {
    return this.hasMany('Rating');
  },
  bookings: () => {
    return this.hasMany('Booking');
  }
});

module.exports = db.model('User', User);
