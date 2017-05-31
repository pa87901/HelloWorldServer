const db = require('../');

const Rating = db.Model.extend({
  tableName: 'ratings',
  user: function() {
    return this.belongsTo('User');
  },
  guide: function() {
    return this.belongsTo('Guide');
  }  
});

module.exports = db.model('Rating', Rating);
