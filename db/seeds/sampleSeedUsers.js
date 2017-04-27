exports.seed = function(knex, Promise) {

      return Promise.all([
        //('users').insert({id:1, first_name: 'Alice', last_name: 'Smith', email: 'alice.smith@gmail.com', password: 'pwd'})
        //knex('orders').insert({id: 1, user_id: 1, orderTotal:'50'}),
      //  knex('owner').insert({id:1, first_name: 'Elon', last_name: 'Musk', email: 'elon.musk@gmail.com', password: 'pwd'})
//knex('food').insert({id: 1, unit_price:10, name: 'Pizza', description: 'Pepperoni and Peppers', image_path: '/testPath'})
       //  knex('food').insert({id: 2, unit_price:5, name: 'Pasta', description: 'Mammas pasta', image_path: '/testPath'})
        // knex('foodordersusers').insert({order_id: 1, food_id: 1, users_id: 1, name: 'Pizza', quantity: 2, unit_price:10, total_price: 20})
         knex('foodordersusers').insert({order_id: 1, food_id: 2, users_id: 1, name: 'Pasta', quantity: 6, unit_price:5, total_price: 30})
      ])


};
