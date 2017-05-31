const db = require('../');

const Chat = db.Model.extend({
  tableName: 'chats',
  user: function() {
    return this.belongsTo('User');
  },
  guide: function() {
    return this.belongsTo('Guide');
  }
});

module.exports = db.model('Chat', Chat);
