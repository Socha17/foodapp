exports.seed = function(knex, Promise) {

      return Promise.all([
        knex('users').insert({id:1, first_name: 'Bob', last_name: 'Long', email: 'Bob.long@gmail.com', password: 'pwd'})
        // knex('orders').insert({id: 2, user_id: 2, orderTotal:'35'})
       // knex('owner').insert({id:1, first_name: 'Elon', last_name: 'Musk', email: 'elon.musk@gmail.com', password: 'pwd'})
      // knex('food').insert({id: 3, unit_price:15, name: 'Chicken', description: 'Good Chicken', image_path: '/testPath'})
        // knex('food').insert({id: 4, unit_price:20, name: 'Steak', description: 'Big Steak', image_path: '/testPath'})
        // knex('foodordersusers').insert({order_id: 2, food_id: 3, users_id: 2, name: 'Chicken', quantity: 1, unit_price:15, total_price: 15})
        //  knex('foodordersusers').insert({order_id: 2, food_id: 4, users_id: 2, name: 'Steak', quantity: 1, unit_price:20, total_price: 20})
      ])


};
