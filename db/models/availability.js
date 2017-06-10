const db = require('../');

const Availability = db.Model.extend({
  tableName: 'availabilities',
  guide: function() {
    return this.belongsTo('Guide', 'guide_id');
  },
  itinerary: function() {
    return this.hasOne('Event', 'availability_id');
  }
});

module.exports = db.model('Availability', Availability);
