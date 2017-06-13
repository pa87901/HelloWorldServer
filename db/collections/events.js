const db = require('../');
const Event = require('../models/event');

const Events = db.Collection.extend({
  model: Event
});

module.exports = Events;