const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

knex.raw('CREATE DATABASE IF NOT EXISTS thesis');

knex.migrate.latest([knex]);

module.exports = db;