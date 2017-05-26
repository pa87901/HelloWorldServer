const db = require('../');

const Availability = db.Model.extend({
  tableName: 'availabilities',
  guide: () => {
    return this.belongsTo('Guide');
  }
});

module.exports = db.model('Availability', Availability);
