
let generateTables = (data) => {
let baseTable = `<table class="orderTable table-fill" style="width:80%; margin: auto;">
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Food Items</th>
          <th>Quantity</th>
          <th>Items Price</th>
          <th>Total Price</th>
          <th>Update Status</th>
        </tr>
        <tr>
          <td>${data.objOrders[0].id}</td>
          <td>${data.objUsers[0].first_name}</td>
          <td>${data.objFood[0].name}</td>
          <td>${data.objFood[0].quantity}</td>
          <td>$${data.objFood[0].unit_price}</td>
          <td>$${data.objOrders[0].orderTotal}</td>
          <td><button type="button" class="btnAccept" name="button"><span class="ui-button-text">Accept</span></button><span class="orderComplete" style="display: none;">Order Complete</span></td>
        </tr>

      </table>`
  $('.containerMain').append(baseTable)

  for (var x = 0; x < data.objOrders.length; x++) {
      for (var i = 1; i < data.objFood.length; i++) {
        if (data.objOrders[x].id == data.objFood[i].order_id ) {
          let otherTables = `
          <tr>
          <td></td>
          <td></td>
          <td>${data.objFood[i].name}</td>
          <td>${data.objFood[i].quantity}</td>
          <td>$ ${data.objFood[i].unit_price}</td>
          <td></td>
          <td></td>
          </tr>`
          $('.orderTable').append(otherTables)
        } else if (data.objOrders[x].id > data.objFood[i].order_id ) {
          let newTr = ` <tr>
          <td>${data.objOrders[x].id}</td>
          <td>${data.objUsers[x].first_name}</td>
          <td>${data.objFood[i + 1].name}</td>
          <td>${data.objFood[i + 1].quantity}</td>
          <td>$${data.objFood[i + 1].unit_price}</td>
          <td>$${data.objOrders[x].orderTotal}</td>
          <td><button type="button" class="btnAccept" name="button"><span class="ui-button-text">Accept</span></button><span class="orderComplete" style="display: none;">Order Complete</span></td>
          </tr>`
          $('.orderTable').append(newTr)
          i++
        }
      }
  }

} // << end func


let orderStatus = () => {

    $(':button').on('click', function() {
      if ($(this).hasClass("btnAccept")) {
        console.log("button clicked");
        $.ajax({
          url: '/admin',
          method: 'POST',
        }).done(() => {
          console.log("success on POST");
          $(this).removeClass( "btnAccept" );
          $(this).addClass( "orderDoneBtn" );
          $(this).children("span").text("Done");

          $('.orderDoneBtn').on('click', function() {
            $(this).children("span").css("display", "none");
            $(this).css("display", "none");
            $(this).siblings(".orderComplete").css("display", "inline");

          });
        });
      }
    })

}


$(document).ready(function() {

  $.ajax({
    url: '/admin',
    method: 'GET',
  }).done((data) => {
    console.log("success on GET");
    generateTables(data);
    orderStatus()
  });

});
