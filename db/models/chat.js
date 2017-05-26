const db = require('../');

const Chat = db.Model.extend({
  tableName: 'chats',
  user: () => {
    return this.belongsTo('User');
  },
  guide: () => {
    return this.belongsTo('Guide');
  }
});

module.exports = db.model('Chat', Chat);
