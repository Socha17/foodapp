exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.integer('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password')
    })
    .createTableIfNotExists('owner', (table) => {
      table.integer('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password')
    })
    .createTableIfNotExists('orders', (table) => {
      table.integer('id').primary()
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
      table.bigInteger('orderTotal')
    })
    .createTableIfNotExists('food', (table) => {
      table.integer('id').primary()
      table.bigInteger('unit_price')
      table.string('name')
      table.string('description')
      table.string('image_path')
    })
    .createTableIfNotExists('foodordersusers', (table) => {
      table.integer('order_id')
      table.integer('food_id')
      table.integer('users_id')
      table.foreign('order_id').references('orders.id')
      table.foreign('food_id').references('food.id')
      table.foreign('users_id').references('users.id')
      table.string('name')
      table.string('quantity')
      table.bigInteger('unit_price')
      table.bigInteger('total_price')
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTableIfExists('owner')
    .dropTableIfExists('foodordersusers')
    .dropTableIfExists('food')
    .dropTableIfExists('orders')
    .dropTableIfExists('users')
   ]);
};
