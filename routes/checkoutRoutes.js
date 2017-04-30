
const express = require('express');
const checkoutRoutes = express.Router();
var accountSid = 'AC3357d80625a26f42893a0de2106e7a84';
var authToken = '95078185f16cd27b11ace4da4f3b7b54';
var client = require('twilio')(accountSid, authToken);


module.exports = (knex) => {


  checkoutRoutes.get("/:id", (req, res) => {
    //console.log("got get")
    console.log("Checkout PAGE HIT");

    res.status(200).render("checkout")
  });

  checkoutRoutes.get("/", (req, res) => {
    console.log("got get")
    res.redirect("./")
  });


  checkoutRoutes.post("/:id", (req, res) => {
  let foodItems = req.body.foodItems;
  let quantity = req.body.quantity;
  let Eachtotal = req.body.Eachtotal;
  let subtotal = req.body.subtotal;
  let Taxes_13perc = req.body.Taxes_13perc;
  let orderTotal = req.body.total;
  console.log(foodItems);
  console.log(quantity);
  console.log(Eachtotal);
  console.log(subtotal);
  console.log(Taxes_13perc);
  console.log(orderTotal);
  console.log("--------------");





  // var queryinterest = (foodItems) => {

  //    let foodItemName = foodItems;
  //    let

  //             //Find food id and unit price for each foodItem in Cart
  //             console.log("OUTSIDE LOOP",foodItemName)
  //             knex.select('id', 'unit_price', 'name').from('food').where({name: foodItemName})
  //             .then((rows)=>{
  //                 console.log("INSIDE KNEX", foodItemName)
  //                 let food_idLookUp = rows[0].id
  //                 let food_unitPriceLookUp = rows[0].unit_price

  //                 console.log("name: ",foodItemName)
  //                 console.log("Unit_price: ", food_unitPriceLookUp)
  //                 console.log("id: ", food_idLookUp)
  //                 return({food_idLookUp: food_idLookUp, food_unitPriceLookUp: food_unitPriceLookUp});
  //             })
  //             .then((result) => {
  //                 console.log("INSIDE RESULT");

  //                 console.log("name: ",foodItemName)
  //                 console.log("Unit_price: ", results.food_unitPriceLookUpP)
  //                 console.log("id: ", results.food_idLookUpP)

  //                   knex('foodordersusers').insert({order_id: thisOrderId,
  //                                         name: foodItems[i],
  //                                         food_id: results.food_idLookUp,
  //                                         users_id: hardCodeUserId,
  //                                         order_id: thisOrderId,
  //                                         quantity: quantity[i],
  //                                         unit_price: results.food_unitPriceLookUp,
  //                                         total_price: subtotal
  //                   })
  //                   .then(() => {
  //                     console.log("One entry entered successfully")
  //                   })

  //                 //Insert foodItem entry into foodordersusers
  //                 // console.log("name: ",foodItemName)
  //                 // console.log("Unit_price: ", food_unitPriceLookUpP)
  //                 // console.log("id: ", food_idLookUpP)
  //             })
  // }


  // // for (i in foodItems){

  // //     queryinterest(foodItems[i]);
  // // }

  // foodItems.forEach( (element) => {
  //   queryinterest(element)
  // })









    //UPDATE TABLES
    //A) orders  table |id-> last known id + 1| user_id-> read from cookie?| orderTotal-> Cart|
    //B) foodordersusers   |order-id -> order.id| name-> Cart foodItems| food_id -> lookUp from Table via Cart foodItems
    //                     |users_id -> read from cookie | quantity ->Cart quantity | unit_price-> Cart Eachtotal/ Cart quantity
    //                     |total_price -> CartEachTotal

    knex('orders').max('id')
      .then( (rows) => {
        //Get max orders id from orders table
        return rows[0].max;
      })
      .then ( (maxOrderId) => {
        let hardCodeUserId = 1;
        let thisOrderId = maxOrderId + 1;
        console.log("ORDER ID TO USE IS", thisOrderId);

        //Insert into orders tables
        knex('orders').insert({id: thisOrderId, user_id: hardCodeUserId, orderTotal: orderTotal})
         .then( () => {
        //Insert into foodordersusersTable
            for (i in foodItems){
              let foodItemName = foodItems[i];
               let foodTotal = Eachtotal[i];
              let foodQuantity = quantity[i];

              //Find food id and unit price for each foodItem in Cart
              console.log("OUTSIDE LOOP",foodItemName)
              knex.select('id', 'unit_price', 'name').from('food').where({name: foodItemName})
              .then((rows)=>{
                  console.log("INSIDE KNEX", foodItemName)
                  let food_idLookUp = rows[0].id
                  let food_unitPriceLookUp = rows[0].unit_price

                  console.log("name: ",foodItemName)
                  console.log("Unit_price: ", food_unitPriceLookUp)
                  console.log("id: ", food_idLookUp)
                  return({food_idLookUp: food_idLookUp, food_unitPriceLookUp: food_unitPriceLookUp, quantity: foodQuantity, name: foodItemName, eachTotal: foodTotal})
              })
              .then((results) => {
                  console.log("INSIDE RESULTS----")
                  //Insert foodItem entry into foodordersusers
                  console.log("name: ",results.name)
                  console.log("Unit_price: ", results.food_unitPriceLookUp)
                  console.log("quantity: ", results.quantity)
                  console.log("id: ", results.food_idLookUp)
                  console.log("Each total: ", results.eachTotal)
                    knex('foodordersusers').insert({order_id: thisOrderId,
                                          name: results.name,
                                          food_id: results.food_idLookUp,
                                          users_id: hardCodeUserId,
                                          order_id: thisOrderId,
                                          quantity: results.quantity,
                                          unit_price: results.food_unitPriceLookUp,
                                          total_price: results.eachTotal
                    })
                    .then(() => {
                      console.log("One entry entered successfully")
                    })

              })

            }
      })
      .then(() => {
        console.log(`${foodItems.length} entries successfully entered`)
      })
    })

    // client.messages.create({
    //   to: '+16478711822',
    // from:'16474928049',
    // body: 'Please check your orders page you have a new pick-up order!',
    // }, function(err, message) {
    //   if(err){
    //     console.log(err);
    //   } else{
    //     console.log(message.sid);
    //   }
    // });
    res.send("Done");
  });
  return checkoutRoutes;
}

