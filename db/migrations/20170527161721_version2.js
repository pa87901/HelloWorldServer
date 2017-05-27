exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('username', 100).nullable().unique();
      table.string('first_name', 100).nullable();
      table.string('last_name', 100).nullable();
      table.boolean('guide').defaultTo(false);
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.decimal('avg_rating').defaultTo(0);
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('guides', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.string('city', 100).notNullable();
      table.decimal('hourly_rate').notNullable();
      table.text('intro').nullable();
      table.text('statement').nullable();
      table.decimal('avg_rating').defaultTo(0);
      table.string('img_url', 255).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('ratings', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('guide_id').references('guides.id').onDelete('CASCADE');
      table.integer('rating').notNullable();
      table.string('rated_by').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('specialties', function(table) {
      table.increments('id').unsigned().primary();
      table.string('specialty').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('guide_specialty', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('guide_id').references('guides.id').onDelete('CASCADE');
      table.integer('specialty_id').references('specialties.id').onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('chats', function(table) {
      table.increments('id').unsigned().primary();
      table.text('message').nullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('guide_id').references('guides.id').onDelete('CASCADE');
      table.string('author', 15).notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('availabilities', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('guide_id').references('guides.id').onDelete('CASCADE');
      table.integer('start_hr').notNullable();
      table.integer('end_hr').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.integer('day_of_week').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('bookings', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('guide_id').references('guides.id').onDelete('CASCADE');
      table.string('city', 100).notNullable();
      table.integer('start_hr').notNullable();
      table.integer('end_hr').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.string('status', 20).notNullable();
      table.string('cancelled_by', 20).nullable();
      table.timestamp('cancelled_at').nullable();
      table.timestamp('confirmed_at').nullable();
      table.timestamp('completed_at').nullable();
      table.decimal('base_fee').nullable();
      table.decimal('tips').nullable();
      table.timestamps(true, true);
    }),


    // knex.schema.createTableIfNotExists('auths', function(table) {
    //   table.increments('id').unsigned().primary();
    //   table.string('type', 8).notNullable();
    //   table.string('oauth_id', 30).nullable();
    //   table.string('password', 100).nullable();
    //   table.string('salt', 100).nullable();
    //   table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    // })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('guides'),
    knex.schema.dropTable('ratings'),
    knex.schema.dropTable('specialties'),
    knex.schema.dropTable('guide_specialty'),
    knex.schema.dropTable('chats'),
    knex.schema.dropTable('availabilities'),
    knex.schema.dropTable('bookings')
  ]);
};

