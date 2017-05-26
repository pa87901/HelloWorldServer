const db = require('../');

const Rating = db.Model.extend({
  tableName: 'ratings',
  user: () => {
    return this.belongsTo('User');
  },
  guide: () => {
    return this.belongsTo('Guide');
  }  
});

module.exports = db.model('Rating', Rating);
