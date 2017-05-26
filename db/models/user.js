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
  // auths: function() {
  //   return this.hasMany('Auth');
  // },
});

module.exports = db.model('User', User);
