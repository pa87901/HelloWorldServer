const db = require('../');

const Availability = db.Model.extend({
  tableName: 'availabilities',
  guide: function() {
    return this.belongsTo('Guide', 'guide_id');
  }
});

module.exports = db.model('Availability', Availability);
