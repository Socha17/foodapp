// Setup credentials
var Cart = {

foodItems: ['Pasta','Pizza'],
quantity: [2, 2],
Eachtotal:  [10, 20],
subtotal: 30,
Taxes_13perc: 10,
total: 40
}


$(document).ready(() => {

  for(i in Cart.foodItems){
  console.log("I am counting up",i);
  $('#orderDetails').find('#itemsPopulate').append(`<div><span class="foodQuantity">${Cart.quantity[i]}</span>x<span class="foodItems">${Cart.foodItems[i]}</span> <span class="Eachtotal">$ ${Cart.Eachtotal[i]}</span></div>`);
  }
  $('#orderDetails').find('#orderTotals').append(`<div><span class="totalLeft">SUBTOTAL</span> <span class="totalRight">$ ${Cart.subtotal}</span></div>`);
  $('#orderDetails').find('#orderTotals').append(`<div><span class="totalLeft">HST(13%)</span> <span class="totalRight">$ ${Cart.Taxes_13perc}</span></div>`);
  $('#orderDetails').find('#orderTotals').append(`<div><span class="totalLeft">TOTAL</span> <span class="totalRight">$ ${Cart.total}</span></div>`);



  $('#creditCardBtn').on('click', () => {
    console.log("Payment_Approved");
    let myObj = {a: "1234"}
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
