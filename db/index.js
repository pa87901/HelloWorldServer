const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

// knex.migrate.latest([knex]);

module.exports = db;