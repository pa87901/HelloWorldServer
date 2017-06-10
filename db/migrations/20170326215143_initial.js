exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('facebook_id', 100).nullable().unique();
      table.string('full_name', 100).nullable();
      table.boolean('guide').defaultTo(false);
      table.string('email', 100).nullable().unique();
      table.string('avatar', 255).nullable();
      table.string('picture', 255).nullable();
      table.decimal('avg_rating').defaultTo(0);
      table.integer('rating_count').defaultTo(0);
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('guides', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.decimal('avg_rating').defaultTo(0);
      table.integer('rating_count').defaultTo(0);
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
      table.string('specialty', 100).nullable().unique();
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
      table.string('city', 100).notNullable();
      table.decimal('hourly_rate').notNullable();
      table.text('intro').nullable();
      table.text('statement').nullable();
      table.dateTime('start_date_hr').notNullable();
      table.dateTime('end_date_hr').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('bookings', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('guide_id').references('guides.id').onDelete('CASCADE');
      table.string('city', 100).notNullable();
      table.dateTime('start_date_hr').notNullable();
      table.dateTime('end_date_hr').notNullable();
      table.string('status', 20).defaultTo('requested');
      table.string('cancelled_by', 20).nullable();
      table.timestamp('cancelled_at').nullable();
      table.timestamp('confirmed_at').nullable();
      table.timestamp('completed_at').nullable();
      table.decimal('base_fee').nullable();
      table.decimal('tips').nullable();
      table.decimal('user_rating').nullable();
      table.text('user_review').nullable();
      table.decimal('guide_rating').nullable();
      table.text('guide_review').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('events', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('availability_id').references('availabilities.id').onDelete('CASCADE');
      table.integer('booking_id').references('bookings.id').onDelete('CASCADE');
      table.string('type').notNullable();
      table.string('establishment_type').nullable();
      table.string('event_name').notNullable();
      table.decimal('longitude').notNullable();
      table.decimal('latitude').notNullable();
      table.integer('time_spent').nullable();
      table.integer('travel_time').nullable();
      table.string('google_place_id').nullable();
      table.string('google_maps_url').nullable();
      table.timestamps(true, true);
    }),   
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
    knex.schema.dropTable('bookings'),
    knex.schema.dropTable('events')
  ]);
};

