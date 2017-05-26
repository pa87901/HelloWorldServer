const db = require('../');

const Guide = db.Model.extend({
  tableName: 'guides',
  user: () => {
    return this.belongsTo('User');
  },
  ratings: () => {
    return this.hasMany('Rating');
  },
  guideSpecialties: () => {
    return this.hasMany('GuideSpecialty');
  },
  chats: () => {
    return this.hasMany('Chat');
  },
  availabilities: () => {
    return this.hasMany('Availability');
  },
  bookings: () => {
    return this.hasMany('Booking');
  }

  // auths: function() {
  //   return this.hasMany('Auth');
  // }
});

module.exports = db.model('Guide', Guide);
