const db = require('../');

const Guide = db.Model.extend({
  tableName: 'guides',
  user: function() {
    return this.belongsTo('User', 'user_id');
  },
  ratings: function() {
    return this.hasMany('Rating');
  },
  guideSpecialties: function() {
    return this.hasMany('GuideSpecialty', 'guide_id');
  },
  chats: function() {
    return this.hasMany('Chat');
  },
  availabilities: function() {
    return this.hasMany('Availability', 'guide_id');
  },
  bookings: function() {
    return this.hasMany('Booking');
  }

});

module.exports = db.model('Guide', Guide);
