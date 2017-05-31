const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  guide: function() {
    return this.hasOne('Guide', 'user_id');
  },
  chats: function() {
    return this.hasMany('Chat');
  },
  ratings: function() {
    return this.hasMany('Rating');
  },
  bookings: function() {
    return this.hasMany('Booking', 'user_id');
  }
});

module.exports = db.model('User', User);
