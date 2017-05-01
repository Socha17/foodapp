

  var Cart = {

  foodItems: [],
  quantity: [],
  Eachtotal:  [],
  subtotal: 0,
  Taxes_13perc: 0,
  total: 0
  }





$(document).ready(function() {


  function addItemToCart (name, price, quantity) {
    console.log("In function");
    console.log("My name is:",name);
    console.log("My price is:",price);
    let found = false;



      if(Cart.foodItems.length >= 1){
        for (var i in Cart.foodItems) {
          //Checking if name already exists

          if (Cart.foodItems[i] === name) {

            Cart.quantity[i] += quantity;
            Cart.Eachtotal[i] = Cart.quantity[i] * price;
            $(`#Item${i}`).find('.foodQuantity').text(Cart.quantity[i]);
            $(`#Item${i}`).find('.Eachtotal').text(`$ ${Cart.Eachtotal[i]}`);
            found = true;
          }
        }
            if(found === false) {
                console.log("pushing new stuff");

              Cart.foodItems.push(name);
              Cart.quantity.push(quantity);
              Cart.Eachtotal.push(quantity * price);
              $('#orderDetails').find('#itemsPopulate').append(`<div id="${`Item${String(Cart.foodItems.length-1)}`}"><span class="foodQuantity">${quantity}</span>x<span class="foodItems">${name}</span> <span class="Eachtotal">$ ${price}</span></div>`);
            }

        console.log("Adding to totals");
        Cart.subtotal = 0;
        for(var j in Cart.foodItems) {
          Cart.subtotal += Cart.Eachtotal[j];
        }
        Cart.Taxes_13perc = (Cart.subtotal * 0.13).toFixed(2);
        Cart.total = (Cart.subtotal * 1.13).toFixed(2);
        $('#Subtotal').find('.totalRight').text(`$${Cart.subtotal}`);
        $('#Taxes_13perc').find('.totalRight').text(`$${Cart.Taxes_13perc}`);
        $('#Total').find('.totalRight').text(`$${Cart.total}`);
      } else {
        console.log("first push");
        Cart.foodItems.push(name);
        Cart.quantity.push(quantity);
        Cart.Eachtotal.push(quantity * price);
        Cart.subtotal += Cart.Eachtotal[0];
        Cart.Taxes_13perc = (Cart.subtotal * 0.13).toFixed(2);
        Cart.total = (Cart.subtotal * 1.13).toFixed(2);
        $('#orderDetails').find('#itemsPopulate').append(`<div id="${`Item${String(0)}`}"><span class="foodQuantity">${Cart.quantity[0]}</span>x<span class="foodItems">${Cart.foodItems[0]}</span> <span class="Eachtotal">$ ${Cart.Eachtotal[0]}</span></div>`);

        $('#orderDetails').find('#orderTotals').append(`<div id="Subtotal"><span class="totalLeft">SUBTOTAL</span> <span class="totalRight">$ ${Cart.subtotal}</span></div>`);
        $('#orderDetails').find('#orderTotals').append(`<div id="Taxes_13perc"><span class="totalLeft">HST(13%)</span> <span class="totalRight">$ ${Cart.Taxes_13perc}</span></div>`);
        $('#orderDetails').find('#orderTotals').append(`<div id="Total"><span class="totalLeft">TOTAL</span> <span class="totalRight">$ ${Cart.total}</span></div>`);
        }


      console.log(Cart);
    return;
  }



$(".add-to-cart").click(function (event) {
  event.preventDefault();
  var name = $(this).attr("item-name");
  var price = Number($(this).attr("item-price"));
  console.log("My name is:",name);
  console.log("My price is:",price);
   addItemToCart (name, price, 1);

  })


// foodItems: [],
//   quantity: [],
//   Eachtotal:  [],
//   subtotal: 0,
//   Taxes_13perc: 0,
//   total: 0

  $('.checkout-button').on('click', function(){
    console.log("clicked checkout");
    localStorage.setItem('foodItems', Cart.foodItems);
    localStorage.setItem('quantity', Cart.quantity);
    localStorage.setItem('Eachtotal', Cart.Eachtotal);
    localStorage.setItem('subtotal', Cart.subtotal);
    localStorage.setItem('Taxes_13perc', Cart.Taxes_13perc);
    localStorage.setItem('total', Cart.total);
  })


})
