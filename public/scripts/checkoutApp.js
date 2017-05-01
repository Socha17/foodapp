// Setup credentials
// var Cart = {

// foodItems: ['Pasta','Pizza'],
// quantity: [2, 2],
// Eachtotal:  [10, 20],
// subtotal: 30,
// Taxes_13perc: 10,
// total: 40
// }


$(document).ready(() => {

  let getFoodItemsS = localStorage.getItem('foodItems');
  let getQuantityS = localStorage.getItem('quantity');
  let getEachtotalS = localStorage.getItem('Eachtotal');
  let getSubtotal = Number(localStorage.getItem('subtotal'));
  let getTaxes_13perc = Number(localStorage.getItem('Taxes_13perc'));
  let getTotal = Number(localStorage.getItem('total'));




    let string_to_array = (str) => {
     return str.trim().split(",");
    };

    let getFoodItems = string_to_array(getFoodItemsS);
    let getQuantity  = string_to_array(getQuantityS);
    let getEachtotal = string_to_array(getEachtotalS);

  var Cart = {

              foodItems: getFoodItems,
              quantity: getQuantity,
              Eachtotal: getEachtotal,
              subtotal: getSubtotal,
              Taxes_13perc: getTaxes_13perc,
              total: getTotal
             }

  console.log("My cart items",Cart);





  for(i in Cart.foodItems){

  $('#orderDetails').find('#itemsPopulate').append(`<div><span class="foodQuantity">${Cart.quantity[i]}</span>x<span class="foodItems">${Cart.foodItems[i]}</span> <span class="Eachtotal">$ ${Cart.Eachtotal[i]}</span></div>`);
  }
  $('#orderDetails').find('#orderTotals').append(`<div><span class="totalLeft">SUBTOTAL</span> <span class="totalRight">$ ${Cart.subtotal}</span></div>`);
  $('#orderDetails').find('#orderTotals').append(`<div><span class="totalLeft">HST(13%)</span> <span class="totalRight">$ ${Cart.Taxes_13perc}</span></div>`);
  $('#orderDetails').find('#orderTotals').append(`<div><span class="totalLeft">TOTAL</span> <span class="totalRight">$ ${Cart.total}</span></div>`);



  $('#creditCardBtn').on('click', () => {
    console.log("Payment_Approved");
    localStorage.clear();

    $.ajax({
      url: '/checkout/123',
      method: 'POST',
      data: Cart
    }).done(() => {
      console.log("Success Cart",Cart);
      console.log("Message request sent");
      $("#checkoutContainer").animate({width:'toggle'},350);
    })



  })





});
